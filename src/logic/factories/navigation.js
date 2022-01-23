class Navigation {

    static AK_OVERVIEW = "AankopenOverview"
    static AK_CREATE = "AankopenCreateview"
    static AK_UPDATE = "AankopenUpdateview"
    static AK_PRINT = "AankopenPrint"

    static VK_OVERVIEW = "VerkopenOverview"
    static VK_CREATE = "VerkopenCreateview"
    static VK_UPDATE = "VerkopenUpdateview"
    static VK_PRINT = "VerkopenPrint"

    static CR_OVERVIEW = "CreditnotasOverview"
    static CR_CREATE = "CreditnotasCreateview"
    static CR_UPDATE = "CreditnotasUpdateview"
    static CR_PRINT = "CreditnotasPrint"

    static LEV_OVERVIEW = "LeveranciersOverview"
    static LEV_CREATE = "LeveranciersCreateview"
    static LEV_UPDATE = "LeveranciersUpdateview"

    static KL_OVERVIEW = "KlantenOverview"
    static KL_CREATE = "KlantenCreateview"
    static KL_UPDATE = "KlantenUpdateview"

    static ART_OVERVIEW = "ArtikelsOverview"
    static ART_CREATE = "ArtikelsCreateview"
    static ART_UPDATE = "ArtikelsUpdateview"

    static navigate(context, name, obj){
        if(obj){
          context.$router.push({
            name: name,
            params: {
              id: obj.id,
              obj: obj
            }
          });
        }
        else{
          context.$router.push({
            name: name,
          });
        }
    }

    static refresh(context){
        context.$router.go()
    }
    
    static back(context){
        context.$router.go(-1)
    }

    static logout(context){
      context.$store.dispatch("setToken", null);
      context.$store.dispatch("setUser", null);
      this.refresh(context);
    }
}

export default Navigation