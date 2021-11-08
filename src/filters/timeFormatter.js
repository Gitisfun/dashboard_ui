import moment from "moment"

export default function timeFormatter (value) {
    return moment(value).format("HH:mm");
}