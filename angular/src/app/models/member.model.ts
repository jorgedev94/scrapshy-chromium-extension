export class Member {
    constructor(
        public id: number = 0,
        public firstname: string = '',
        public lastname: string = '',
        public email: string = '',
        public ssn: string = '',
        public dob: string = '',
        public income: string = '',
        public phone: string = '',
    ) {}
}