import { Injectable } from '@angular/core';
import { last } from 'rxjs';

interface ScrapData {
  efectividad: string[];
  miembros: string[];
  policy_id: string[];
  subscriber_id: string[];
  terminacion: string[];
  ffm_id: string[];
  owner: string;
  email?: string; // Opcional
  phone?: string; // Opcional
  firstname: string;
  lastname: string;
  middlename: string;
}

@Injectable({
    providedIn: 'root',
})
export class Scrapshy {
    constructor() {}

    scrap(tabId): Promise<ScrapData | null> {
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
                                const elementValues7 = document.querySelector('.css-1ahwws6').textContent.trim()                            

                                let data = {                                    
                                    miembros: elementValues,
                                    efectividad: elementValues2,
                                    terminacion: elementValues3,
                                    subscriber_id: elementValues4,
                                    policy_id: elementValues5,
                                    ffm_id: elementValues6,
                                    owner: elementValues7,         
                                    email: "example@example.com", // Añadir si es necesario
                                    phone: "123-456-7890",
                                    firstname: '',
                                    lastname: '',
                                    middlename: ''
                                };

                                if (data) {
                                    const namesArray = data.miembros[0].split(',').map((name) => name.trim());
                                    const nombreCompleto = data.owner.split(' ');
                                    const cantidadnombres = nombreCompleto.length;
                                    data.firstname = nombreCompleto[0]
                                    
                                    if(cantidadnombres>0 && cantidadnombres<2 && nombreCompleto[1].length<2 || cantidadnombres>3){
                                        const secondname = nombreCompleto[1]
                                        data.middlename = secondname
                                        if(cantidadnombres>2){
                                            const apellido = (nombreCompleto[2]+' '+nombreCompleto[3])
                                            data.lastname = apellido
                                        }else{
                                            const apellido = nombreCompleto[2]
                                            data.lastname = apellido
                                        }
                                    }else if(cantidadnombres>0 && cantidadnombres<2){
                                        const apellido = nombreCompleto[1]
                                        data.lastname = apellido
                                    }else{
                                        const apellido = (nombreCompleto[1]+' '+nombreCompleto[2])
                                        data.lastname = apellido
                                    }
                                    
                                    data.owner = nombreCompleto[0]
                                    data.miembros = namesArray;
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
                            //console.log('Este es el resultado:' + JSON.stringify(spanText));
                            resolve(spanText); // Resuelve con el resultado                            
                        }
                    },
                )
            })
    }
}
