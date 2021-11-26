export default {
    data(){
        return {
            tableController: null,
            total: 0,
            loading: false,
            page: 1,
            perPage: 10,
            defaultSortOrder: "asc",
            params: {
              search: "",
              sort_by: "",
              sort_order: "asc",
              limit: 10,
               page: "",
            },
            data: [],   
            selected: null,
            search: ""
        }
    },
    mounted(){
        this.loadTable()
    },
    methods: {
        loadTable() {
            this.tableController.all(this, this.params, (res) => {
                this.perPage = this.params.limit;
                this.total = res.data.total;
                this.data = res.data.list;
                });
            },
        onPageChange(page) {
            this.params.page = page;
            this.loadTable();
        },
        onSort(field, order) {
            this.params.sort_by = field;
            this.params.sort_order = order;
            this.loadTable();
        }, 
        searchOnlyTable(){
            this.params.search = this.search
            this.loadTable()
        },
    }
}