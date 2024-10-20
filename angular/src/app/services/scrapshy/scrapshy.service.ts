import { Inject, Injectable, signal } from '@angular/core';
import { TAB_ID } from 'src/app/app.config';

@Injectable({
    providedIn: 'root',
})
export class ScrapshyService {

    _document = signal<Document | null>(null)
    get document(): Document | null {
        return this._document();
    }
    
    constructor(
        @Inject(TAB_ID) readonly tabId: number,
    ) {}

    evaluate(
        expression: string,
        contextNode: Node | null = this.document,
        resolver = null,
        type = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        result = null
    ): XPathResult | null {
        if (this.document && contextNode) {
            return this.document.evaluate(
                expression,
                contextNode,
                resolver,
                type,
                result
            );
        }
        console.warn('Document or contextNode is null.');
        return null;
    }

    querySelectorAll(text: string) {
        return this.document.querySelectorAll(text)
    }

    async get_dom(): Promise<void> {
        try {
            const [injectionResult] = await chrome.scripting.executeScript({
                target: { tabId: this.tabId },
                func: () => {
                    const xpath = "//button[span[text()='View or Edit Application']]";
                    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                    const targetButton = result.singleNodeValue as HTMLElement | null;

                    if (targetButton) {
                        targetButton.click();
                    }
                    
                    const doc = document.documentElement.outerHTML;

                    const xpath_close = "//div[@role='dialog']//button[@aria-label='close']";
                    const result_close = document.evaluate(xpath_close, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                    const closeButton = result_close.singleNodeValue as HTMLElement | null;

                    if (closeButton) {
                        closeButton.click();
                    }

                    return doc
                },
            });

            if (chrome.runtime.lastError) {
                throw new Error(chrome.runtime.lastError.message);
            } else if (injectionResult && injectionResult.result) {
                const domString: string = injectionResult.result as string;
                const parser = new DOMParser();
                const doc = parser.parseFromString(domString, 'text/html');
                console.log(doc)
                this._document.set(doc);
            } else {
                throw new Error('No se obtuvo el DOM.');
            }

        } catch (error) {
            console.error('Error al obtener el DOM:', error);
            throw error;
        }
    }

    get_data_table(xpath, context = null) {
        const resultEval = this.evaluate(xpath, context == null ? undefined : context);
    
        const tableDataHorizontal: string[][] = [];
        const tableDataVertical: string[][] = [];
        
        for (let i = 0; i < resultEval.snapshotLength; i++) {
            const row = resultEval.snapshotItem(i) as HTMLElement;
            const cells = row.querySelectorAll('td');
            const cols = row.querySelectorAll('tr');
            
            let rowData: string[] = [];
            cells.forEach((cell, index) => {
                const content = cell.textContent?.trim() || '';
                if (cells.length / cols.length !== 2) {
                    rowData.push(content);
                    if ((index + 1) % 6 === 0) {
                        tableDataHorizontal.push([...rowData]);
                        rowData = [];
                    }
                } else if ((index + 1) % 2 === 0) {
                    rowData.push(content);
                }
            });
            
            if (rowData.length > 0) {
                tableDataVertical.push(rowData);
            }       
        }
        
        return [tableDataHorizontal, tableDataVertical];
    }   

}
