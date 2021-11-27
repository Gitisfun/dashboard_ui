class Navigation {

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
}

export default Navigation