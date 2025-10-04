import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  private swalPromise: Promise<any> | null = null;

  private async getSwal() {
    if (!this.swalPromise) {
      this.swalPromise = import('sweetalert2');
    }
    const { default: Swal } = await this.swalPromise;
    return Swal;
  }

  async fire(config: any) {
    const Swal = await this.getSwal();
    return Swal.fire(config);
  }

  async confirm(config: any) {
    const Swal = await this.getSwal();
    return Swal.fire({
      ...config,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  }

  async success(title: string, text?: string) {
    const Swal = await this.getSwal();
    return Swal.fire({
      icon: 'success',
      title,
      text
    });
  }

  async error(title: string, text?: string) {
    const Swal = await this.getSwal();
    return Swal.fire({
      icon: 'error',
      title,
      text
    });
  }

  async warning(title: string, text?: string) {
    const Swal = await this.getSwal();
    return Swal.fire({
      icon: 'warning',
      title,
      text
    });
  }
}
