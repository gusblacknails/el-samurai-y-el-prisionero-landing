//
// Sorteo Component - Form handling and Firebase integration
// ================================================================================

import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

let firebaseInitPromise = null;

function getSorteoFirebaseSettings() {
    return window.__SORTEO_FIREBASE__ || null;
}

function isFirebaseConfigured(settings) {
    return Boolean(
        settings &&
        settings.apiKey &&
        settings.appId &&
        settings.projectId
    );
}

async function initSorteoFirebase() {
    if (firebaseInitPromise) {
        return firebaseInitPromise;
    }

    firebaseInitPromise = (async () => {
        const settings = getSorteoFirebaseSettings();

        if (!isFirebaseConfigured(settings)) {
            console.warn(
                'Sorteo Firebase: falta apiKey o appId. ' +
                'Registra una app web en Firebase Console y completa data.json → config.sorteoFirebase.'
            );
            return null;
        }

        const { collection: collectionName, ...firebaseConfig } = settings;

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        const result = await signInAnonymously(auth);

        return {
            db,
            userId: result.user.uid,
            collectionName: collectionName || 'participantes',
        };
    })().catch((error) => {
        firebaseInitPromise = null;
        console.error('Error inicializando Firebase para el sorteo:', error);
        return null;
    });

    return firebaseInitPromise;
}

async function saveParticipacion(db, collectionName, userId, payload) {
    await addDoc(collection(db, collectionName), {
        userId,
        nombre: payload.name,
        primer_apellido: payload.surname,
        segundo_apellido: payload.secondSurname,
        email: payload.email,
        telefono: payload.tlf,
        provincia: payload.province,
        createdAt: serverTimestamp(),
    });
}

function initSorteoMoreLink(element, sorteoId) {
    const moreLink = element.querySelector(`#sorteo-moreLink-${sorteoId}`);
    if (!moreLink || moreLink.dataset.listenerAdded === 'true') return;

    moreLink.dataset.listenerAdded = 'true';
    moreLink.addEventListener('click', (event) => {
        event.preventDefault();
        const moreText = element.querySelector(`#sorteo-moreText-${sorteoId}`);
        if (moreText) {
            const moreContent = moreText.querySelector('.more-content');
            if (moreContent) {
                moreContent.style.display = 'inline';
            }
        }
        moreLink.style.display = 'none';
    });
}

function initSorteoBasesModal(element, sorteoId) {
    const modal = element.querySelector(`#sorteo-bases-modal-${sorteoId}`);
    const openLink = element.querySelector(`[data-sorteo-bases-open="${sorteoId}"]`);
    if (!modal || !openLink || modal.dataset.listenerAdded === 'true') return;

    modal.dataset.listenerAdded = 'true';
    const closeElements = modal.querySelectorAll('[data-sorteo-bases-close]');
    const closeButton = modal.querySelector('.sorteo-bases-modal__close');
    let lastFocusedElement = null;

    const openModal = () => {
        lastFocusedElement = document.activeElement;
        modal.classList.add('--is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('sorteo-bases-modal-open');
        closeButton?.focus();
    };

    const closeModal = () => {
        modal.classList.remove('--is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('sorteo-bases-modal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        }
    };

    openLink.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        openModal();
    });

    closeElements.forEach((closeEl) => {
        closeEl.addEventListener('click', (event) => {
            event.preventDefault();
            closeModal();
        });
    });

    modal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeModal();
        }
    });
}

function initSorteoForm(element, sorteoId) {
    const formId = `sorteo-form-${sorteoId}`;
    const form = element.querySelector(`#${formId}`);
    if (!form || form.dataset.listenerAdded === 'true') return;

    form.dataset.listenerAdded = 'true';
    const submitButton = form.querySelector('button[type="submit"]');
    const defaultSubmitLabel = submitButton?.textContent?.trim() || 'Enviar';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = element.querySelector(`#sorteo-name-${sorteoId}`)?.value?.trim();
        const surname = element.querySelector(`#sorteo-surname-${sorteoId}`)?.value?.trim();
        const secondSurname = element.querySelector(`#sorteo-secondSurname-${sorteoId}`)?.value?.trim();
        const email = element.querySelector(`#sorteo-email-${sorteoId}`)?.value?.trim();
        const tlf = element.querySelector(`#sorteo-tlf-${sorteoId}`)?.value?.trim();
        const province = element.querySelector(`#sorteo-province-${sorteoId}`)?.value;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando…';
        }

        try {
            const firebase = await initSorteoFirebase();

            if (!firebase) {
                alert(
                    'El sorteo aún no está configurado. ' +
                    'Completa la app web en Firebase Console (apiKey y appId).'
                );
                return;
            }

            await saveParticipacion(firebase.db, firebase.collectionName, firebase.userId, {
                name,
                surname,
                secondSurname,
                email,
                tlf,
                province,
            });

            form.reset();
            alert('Datos guardados exitosamente.');
        } catch (error) {
            console.error('Error al guardar los datos del sorteo:', error);
            alert('No se pudo enviar el formulario. Inténtalo de nuevo más tarde.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultSubmitLabel;
            }
        }
    });
}

export function initSorteoComponent() {
    const sorteoElements = document.querySelectorAll('.c-sorteo');

    sorteoElements.forEach((element) => {
        const sorteoId = element.id;
        if (!sorteoId) return;

        if (element.dataset.sorteoInitialized === 'true') return;
        element.dataset.sorteoInitialized = 'true';

        initSorteoMoreLink(element, sorteoId);
        initSorteoBasesModal(element, sorteoId);
        initSorteoForm(element, sorteoId);
    });
}
