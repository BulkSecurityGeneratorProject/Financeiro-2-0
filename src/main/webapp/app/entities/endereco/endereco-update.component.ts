import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from './endereco.service';

@Component({
    selector: 'jhi-endereco-update',
    templateUrl: './endereco-update.component.html'
})
export class EnderecoUpdateComponent implements OnInit {
    endereco: IEndereco;
    isSaving: boolean;

    constructor(protected enderecoService: EnderecoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ endereco }) => {
            this.endereco = endereco;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.endereco.id !== undefined) {
            this.subscribeToSaveResponse(this.enderecoService.update(this.endereco));
        } else {
            this.subscribeToSaveResponse(this.enderecoService.create(this.endereco));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEndereco>>) {
        result.subscribe((res: HttpResponse<IEndereco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
