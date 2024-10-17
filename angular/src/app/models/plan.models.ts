export class Plan {
    constructor(
        public ffm_id: number = 1234567890,
        public hios_id: string = '',
        public name: string = '',
        public effective: string = '',
        public termination: string = '',
        public premium: string = '',
        public deductible: string = '',
        public max_payout: string = '',
        public dependents: string = '',
    ) {
        if(String(this.ffm_id).length != 10) {
            throw new Error('ffm_id debe tener exactamente 10 dígitos numéricos.');
        }

    }
}