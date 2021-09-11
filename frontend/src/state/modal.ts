import SharedState from 'bstate';

export interface ModalContextState {
    isLoginModalOpen: boolean;
    isSignupModalOpen: boolean;
    isSignoutModalOpen: boolean;
    isPublishModalOpen: boolean;
    isTelegramSyncModalOpen: boolean;
    isTwoFactorAuthModalOpen: boolean;
    isTwoFactorAuthSyncModalOpen: boolean;
}

type ModalName = keyof ModalContextState;

class ModalContext extends SharedState<ModalContextState> {
    constructor() {
        super();
        this.state = {
            isLoginModalOpen: false,
            isSignupModalOpen: false,
            isSignoutModalOpen: false,
            isPublishModalOpen: false,
            isTelegramSyncModalOpen: false,
            isTwoFactorAuthModalOpen: false,
            isTwoFactorAuthSyncModalOpen: false,
        }
    }

    async onOpenModal(modalName: ModalName) {
        await this.setState(<any>{
            [modalName]: true
        });
    }

    async onCloseModal(modalName: ModalName) {
        await this.setState(<any>{
            [modalName]: false
        });
    }
}

export const modalContext = new ModalContext();