module.exports = {

    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getMonth() + 1}`.slice(-2)
        const day = `0${date.getDate()}`.slice(-2)
        const hour = date.getHours()
        const minutes = date.getMinutes()

        return {
            day,
            month,
            year,
            hour,
            minutes,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    formatPrice(price){
        return value = new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency:'BRL'
        }).format(price/100)
    },
    formatCpfCnpj(value){
        value = value.replace(/\D/g,"")

        if(value.length > 14){
            value = value.slice(0,-1)
        }

        //check if is cnpj - 11.222.333/001-11
        if(value.length > 11){
            //11.22233300111
            value = value.replace(/(\d{2})(\d)/,"$1.$2")
            ////11.222.33300111
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            ////11.222.333/00111
            value = value.replace(/(\d{3})(\d)/,"$1/$2")
            ////11.222.333/001-11
            value = value.replace(/(\d{4})(\d)/,"$1-$2")

        }else{
            //cpf
            //111.11111111
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            //111.111.11111
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            //111.111.111-11
            value = value.replace(/(\d{3})(\d)/,"$1-$2")

        }
        return value
    },
    formatCep(value) {

        value = value.replace(/\D/g,"")

        if(value.length > 8){
            value = value.slice(0,-1)
        }
        value = value.replace(/(\d{5})(\d)/,"$1-$2")

        return value
    }

}