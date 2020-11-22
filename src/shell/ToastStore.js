import { makeObservable, action, observable } from 'mobx';
import Toast from 'bootstrap/js/dist/toast';

const DEFAULT_OPTIONS = {
  type: 'primary',
  delay: 3000,
};

export class ToastStore {
  toast = DEFAULT_OPTIONS;

  constructor() {
    makeObservable(this, {
      toast: observable.ref,
      show: action.bound,
      showSuccess: action.bound,
      showWarning: action.bound,
      showError: action.bound,
    });
  }

  show(toast) {
    this.toast = { ...DEFAULT_OPTIONS, ...toast };
    this.bsToast?.dispose();
    this.bsToast = new Toast(document.querySelector('app-toast > .toast'), {
      delay: this.toast.delay,
    });
    this.bsToast.show();
  }

  showSuccess(toast) {
    this.show({ ...toast, type: 'success' });
  }

  showWarning(toast) {
    this.show({ ...toast, type: 'warning' });
  }

  showError(toast) {
    this.show({ ...toast, type: 'danger' });
  }
}
