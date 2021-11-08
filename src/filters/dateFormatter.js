import moment from "moment"

export default function dateFormatter (value) {
    return moment(value).format("DD-MM-YYYY");
}