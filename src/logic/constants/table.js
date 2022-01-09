class TableColumns {
    
    static getAankoopColumns(value){
        if(value){
            return {
              datum: "11%",
              factuur_nr: "10%",
              leverings_nr: "10%",
              leverancier_naam: "10%",
              klant_naam: "10%",
              leverdatum: "10",
              isGeleverd: "8%",
              isBetaald: "8%",
              updated_time: "8%",
              updated_date: "12%",
              updated_by: "14%"
            }
        }
        return {
            datum: "12%",
            factuur_nr: "14%",
            leverings_nr: "14%",
            leverancier_naam: "17%",
            klant_naam: "15%",
            leverdatum: "11",
            isGeleverd: "8%",
            isBetaald: "8%",
            updated_time: "0%",
            updated_date: "0%",
            updated_by: "0%"
          }
    }

    static getVerkoopColumns(value){
        if(value){
            return {
              datum: "10%",
              factuur_nr: "11%",
              leverings_nr: "11%",
              klant_naam: "13%",
              leverdatum: "8",
              isBetaald: "8%",
              updated_time: "8%",
              updated_date: "12%",
              updated_by: "14%"
            }
        }
        return {
            datum: "12%",
            factuur_nr: "15%",
            leverings_nr: "15%",
            klant_naam: "15%",
            leverdatum: "15",
            isBetaald: "10%",
            updated_time: "0%",
            updated_date: "0%",
            updated_by: "0%"
        }
    }

    static getCreditnotaColumns(value){
        if(value){
            return {
              datum: "10%",
              factuur_nr: "11%",
              leverings_nr: "11%",
              klant_naam: "13%",
              leverdatum: "8",
              isBetaald: "8%",
              updated_time: "8%",
              updated_date: "12%",
              updated_by: "14%"
            }
        }
        return {
            datum: "12%",
            factuur_nr: "15%",
            leverings_nr: "15%",
            klant_naam: "15%",
            leverdatum: "15",
            isBetaald: "10%",
            updated_time: "0%",
            updated_date: "0%",
            updated_by: "0%"
        }
    }

    static getKlantColumns(value){
        if(value){
            return {
              klant_nr: "20%",
              naam: "25%",
              blacklist: "10%",
              updated_time: "10%",
              updated_date: "15%",
              updated_by: "20%"
            }
          }
        return {
            klant_nr: "20%",
            naam: "60%",
            blacklist: "15%",
            updated_time: "0%",
            updated_date: "0%",
            updated_by: "0%"
        }
    }

    static getLeverancierColumns(value){
        if(value){
            return {
              leveranciers_nr: "20%",
              naam: "25%",
              blacklist: "10%",
              updated_time: "10%",
              updated_date: "15%",
              updated_by: "20%"
            }
          }
        return {
            leveranciers_nr: "20%",
            naam: "60%",
            blacklist: "15%",
            updated_time: "0%",
            updated_date: "0%",
            updated_by: "0%"
        }
    }

    static getArtikelColumns(value){
        if(value){
            return {
              artikelcode: "10%",
              naam: "16%",
              inStock: "10%",
              omschrijving: "26%",
              prijs: "8%",
              updated_time: "10%",
              updated_date: "10%",
              updated_by: "10%"
            }
        }
        return {
        artikelcode: "15%",
        naam: "20%",
        inStock: "10%",
        omschrijving: "43%",
        prijs: "12%",
        updated_time: "0%",
        updated_date: "0%",
        updated_by: "0%"
        }
    }

}

export default TableColumns