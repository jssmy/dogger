import { SweetAlertOptions } from 'sweetalert2';

export const ALERT_CONFIRM_DELETE: SweetAlertOptions = {
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Nope'
};