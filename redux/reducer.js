export const FILTER_HOMES = 'spotahome/repos/FILTER';
export const GET_HOMES = 'spotahome/repos/LOAD';
export const GET_HOMES_SUCCESS = 'spotahome/repos/LOAD_SUCCESS';
export const GET_HOMES_FAIL = 'spotahome/repos/LOAD_FAIL';



export default function reducer(state = {homes: []}, action) {
  const {type, payload} = action;
  const {homes} = state

  switch (type) {
    case FILTER_HOMES:
      console.log(payload);
      // console.log(homes);
      return {
        ...state,
        homes: homes.data.homecards.filter((home) => home.pricePerMonth > payload.minPrice && home.pricePerMonth < payload.maxPrice),
      };
    case GET_HOMES:
      return {...state, loading: true};
    case GET_HOMES_SUCCESS:
      return {...state, loading: false, homes: action.payload.data};
    case GET_HOMES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching data'
      };
    default:
      return state;
  }
}

export function getHomes() {
  console.log( 'fetch output -->', fetch('https://www.spotahome.com/api/public/listings/similars/122836').then(res => res.json()).then(data => console.log(data)));
  return {
    type: GET_HOMES,
    payload: {
      request: {
        url: `/api/public/listings/similars/122836`
      }
    }
  };
}

export const actionCreators = {
  filterHome: (range) => {
    console.log('inside reducer')
    // console.log(range)
    return {type: FILTER_HOMES, payload: range}
  }
}