module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if( month < 0 ||month == 0 && today.getDate() <= birthDate.getDate()){
            age = age -1
        }

        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format:`${day}/${month}/${year}`
        }
    },
    graduation(value){
        if(value == 'medio')return "Ensino Médio Completo"        
        else if(value == 'superior') return "Ensino Superior Completo"
        else if(value == 'mestrado') return "Mestrado"        
        else if(value == 'doutorado') return "Doutorado"
    },
    classTyp(value){
        if(value == 'P') return "Presencial"
        else return "A Distancia"
    },


    studadion(value){
        if(value =="quinto") return "5º ano do ensino fundamental"
        else if(value =="sexto") return "6º ano do ensino fundamental"
        else if(value =="setmo") return "7º ano do ensino fundamental"
        else if(value =="oitavo") return "8º ano do ensino fundamental"
        else if(value =="primeiro") return "1º ano do ensino médio"
        else if(value =="segundo") return "2º ano do ensino médio"
        else if(value =="terceiro") return "3º ano do ensino médio"

    }    
}

