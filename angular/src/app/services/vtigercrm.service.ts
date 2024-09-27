import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Md5 } from 'ts-md5';
import { environment } from '../../enviroments/enviroments';

@Injectable({
    providedIn: 'root',
})
export class WSClient {
    constructor(
        private http: HttpClient,
        private apiUrl = environment.apiUrl,
        private apiToken = environment.apiToken,
        private apiUser = environment.apiUser
    ) {
        // This service can now make HTTP requests via `this.http`.
    }

    async getwb() {
        const data = await firstValueFrom(this.http.get<any>(`${this.apiUrl}?operation=getchallenge&username=superadmin`));
        console.log('Token: ' + data.result.token);
        return this.postwb(data.result.token);
    }

    async postwb(token) {
        const md5 = new Md5();
        const accessKey = md5.appendStr(token + this.apiToken).end();
        const formData = new URLSearchParams();

        formData.append('operation', 'login');
        formData.append('username', this.apiUser);
        formData.append('accessKey', String(accessKey));

        console.log('AccessKey: ' + accessKey);

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        const data = await firstValueFrom(this.http.post<any>(this.apiUrl, formData.toString(), { headers: headers }));
        console.log('Sessiond id: ' + data.result.sessionName);
        /* this.getTypes(data.result.sessionName) */
        /* this.getDescribe(data.result.sessionName) */
        /* this.createContact(data.result.sessionName) */
        /* this.searchContact(data.result.sessionName) */
        return data.result.sessionName;
    }

    async getTypes(sessionId) {
        const data = await firstValueFrom(this.http.get<any>(`${this.apiUrl}?operation=listtypes&sessionName=${sessionId}`));
        console.log('GetTypes: ' + JSON.stringify(data));
        return this.getDescribe(sessionId);
    }

    async getDescribe(sessionId) {
        const data = await firstValueFrom(
            this.http.get<any>(`${this.apiUrl}?operation=describe&sessionName=${sessionId}&elementType=Search`),
        );
        console.log('GetDescribe: ' + JSON.stringify(data));
        return data;
    }

    async createContact(sessionId) {
        const leadData = {
            firstname: 'ACE',
            lastname: 'TESTER3', // mandatory
            cf_759: '01/01/1001',
            assigned_user_id: '19X79', // from authorization response
        };

        const formData = new URLSearchParams();
        formData.append('operation', 'create');
        formData.append('format', 'json');
        formData.append('sessionName', sessionId);
        formData.append('elementType', 'Contacts');
        formData.append('element', JSON.stringify(leadData));

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });

        console.log(formData);
        console.log(leadData);

        try {
            const data = await firstValueFrom(this.http.post<any>(this.apiUrl, formData.toString(), { headers }));
            console.log('Response from CRM:', data);
        } catch (error) {
            console.error('Error creating lead:', error);
        }
    }

    async searchContact(sessionId) {
        const data = await firstValueFrom(
            this.http.get<any>(
                `${this.apiUrl}?operation=lookup&type=phone&value=3136284596&sessionName=${sessionId}&searchIn={“module_name”:[“name”]}`,
            ),
        );
        console.log(data);
    }
}