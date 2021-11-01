class RouteStrings {
    
    static pagination(params){
        return `?search=${params.search}&sort_by=${params.sort_by}&sort_order=${params.sort_order}&limit=${params.limit}&page=${params.page}`
    }
    
}

export default RouteStrings