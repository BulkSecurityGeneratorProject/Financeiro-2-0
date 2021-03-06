import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParcela } from 'app/shared/model/parcela.model';
import { ParcelaService } from './parcela.service';

@Component({
    selector: 'jhi-parcela-delete-dialog',
    templateUrl: './parcela-delete-dialog.component.html'
})
export class ParcelaDeleteDialogComponent {
    parcela: IParcela;

    constructor(protected parcelaService: ParcelaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.parcelaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'parcelaListModification',
                content: 'Deleted an parcela'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-parcela-delete-popup',
    template: ''
})
export class ParcelaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ parcela }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ParcelaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.parcela = parcela;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
