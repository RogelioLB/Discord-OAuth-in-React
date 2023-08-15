export default function useParams(){
    return new URLSearchParams(location.search)
}