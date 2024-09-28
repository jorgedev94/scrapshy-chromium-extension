import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../enviroments/enviroments';

@Injectable({
    providedIn: 'root',
})
export class Scrapshy {
    private apiUrl = environment.apiUrl
    private apiToken = environment.apiToken
    private apiUser = environment.apiUser
    constructor(
        private http: HttpClient,
    ) {
        // This service can now make HTTP requests via `this.http`.
    }

    scrap_2() {
        function getSpanTexts(texts: string[]) {
            console.log(document)
            const textConditions = texts.map((text) => `text()="${text}"`).join(' or ');
            const xpath = `//tr/td[span[${textConditions}]]/following-sibling::td/span`;

            const result = document.evaluate(
                xpath,
                document,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null,
            );
            const values: string[] = [];

            for (let i = 0; i < result.snapshotLength; i++) {
                const span = result.snapshotItem(i) as HTMLElement;
                if (span) {
                    values.push(span.textContent || '');
                }
            }

            return values;
        }

        function initial() {
            const texts = ['Miembros', 'Members'];
            const texts2 = ['Vigente', 'Effective'];
            const texts3 = ['Vencimiento', 'Expiration'];
            const texts4 = ['ID de subscritor', 'Subscriber ID'];
            const texts5 = ['Nro. de identificación de la póliza', 'Policy ID'];
            const texts6 = ['ID de FFM', 'FFM ID'];

            const elementValues = getSpanTexts(texts);
            const elementValues2 = getSpanTexts(texts2);
            const elementValues3 = getSpanTexts(texts3);
            const elementValues4 = getSpanTexts(texts4);
            const elementValues5 = getSpanTexts(texts5);
            const elementValues6 = getSpanTexts(texts6);

            let data = {
                Miembros: elementValues,
                Efectividad: elementValues2,
                Terminacion: elementValues3,
                Subscriber_id: elementValues4,
                Policy_id: elementValues5,
                ffm_id: elementValues6,
            };

            if (data) {
                console.log(data)
                const namesArray = data.Miembros[0].split(',').map((name) => name.trim());
                data.Miembros = namesArray;
            }
            return data;
        }

        return initial(); // Llamamos a initial y devolvemos el resultado
    }

    scrap(tabId: number) {
        return new Promise((resolve) => {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabId },
                    func: () => {
                        // Definimos ambas funciones en el mismo contexto
                        function getSpanTexts(texts: string[]) {
                            const textConditions = texts.map((text) => `text()="${text}"`).join(' or ');
                            const xpath = `//tr/td[span[${textConditions}]]/following-sibling::td/span`;

                            const result = document.evaluate(
                                xpath,
                                document,
                                null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null,
                            );
                            const values: string[] = [];

                            for (let i = 0; i < result.snapshotLength; i++) {
                                const span = result.snapshotItem(i) as HTMLElement;
                                if (span) {
                                    values.push(span.textContent || '');
                                }
                            }

                            return values;
                        }

                        function initial() {
                            const texts = ['Miembros', 'Members'];
                            const texts2 = ['Vigente', 'Effective'];
                            const texts3 = ['Vencimiento', 'Expiration'];
                            const texts4 = ['ID de subscritor', 'Subscriber ID'];
                            const texts5 = ['Nro. de identificación de la póliza', 'Policy ID'];
                            const texts6 = ['ID de FFM', 'FFM ID'];

                            const elementValues = getSpanTexts(texts);
                            const elementValues2 = getSpanTexts(texts2);
                            const elementValues3 = getSpanTexts(texts3);
                            const elementValues4 = getSpanTexts(texts4);
                            const elementValues5 = getSpanTexts(texts5);
                            const elementValues6 = getSpanTexts(texts6);

                            let data = {
                                Miembros: elementValues,
                                Efectividad: elementValues2,
                                Terminacion: elementValues3,
                                Subscriber_id: elementValues4,
                                Policy_id: elementValues5,
                                ffm_id: elementValues6,
                            };

                            if (data) {
                                const namesArray = data.Miembros[0].split(',').map((name) => name.trim());
                                data.Miembros = namesArray;
                            }
                            return data;
                        }

                        return initial(); // Llamamos a initial y devolvemos el resultado
                    },
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        console.error(chrome.runtime.lastError);
                        resolve(null); // Resuelve con null si hay un error
                    } else {
                        const spanText = results[0].result;
                        console.log('Este es el resultado:' + JSON.stringify(spanText));
                        resolve(spanText); // Resuelve con el resultado
                    }
                },
            );
        });
    }
}
