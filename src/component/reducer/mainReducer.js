
const initialState = {
    apartments: {
        forRent: {},
        forSell: {}
    },
    articles: {},
    group: {},
    recommended: {},
    newsPapers: {},
    checkMessages: {},
    features: {},

}

const mainReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'INITIAL':
            console.log(payload)
            return {
                ...state
            }
        // case 'INITIAL':
        //     return {
        //         ...state, items: payload.map(item => {
        //             return { ...item, cart: false, wishList: false, currentImage: 0 }
        //         })
        //     }
        // case 'SEARCH':
        //     console.log(payload)
        //     return {
        //         ...state, foundItems: state.items.filter(item => {
        //             if (payload !== '') {
        //                 return item.name.indexOf(payload) !== -1
        //             } else {
        //                 return null
        //             }
        //         })
        //     }
        // case 'SELECT_TYPE':
        //     return { ...state, selected: state.items.filter(item => item.bodyBuild === payload || item.type === payload) }
        // case 'SORT':
        //     console.log(payload)
        //     return {
        //         ...state, selected: state.selected.sort((a, b) => {
        //             switch (payload) {
        //                 case 'price':
        //                     return a.price - b.price
        //                 case 'name':
        //                     return ('' + a.name).localeCompare(b.name);
        //                 case 'date':
        //                     return b.date - a.date
        //                 default: return null
        //             }
        //         })
        //     }
        // case 'NEW_COLLECTION':
        //     return {
        //         ...state, selected: state.items.sort((a, b) => {
        //             return b.date - a.date
        //         }).slice(0, 10)
        //     }
        // case 'ADD_TO_CART':
        //     let idExists = state.cart.map(item => {
        //         return item._id + item.sizeSelected.name
        //     });
        //     console.log(idExists)
        //     let idExist = idExists.indexOf(payload.itemId) > -1
        //     console.log('id exist: ' + idExist)
        //     console.log('payload: ' + payload.item + 'payloadId: ' + payload.itemId)
        //     let cart = state.cart.slice();
        //     console.log('cart: ' + cart)
        //     console.log('counter selected: ' + payload.item.countSelected)
        //     if (!idExist) {
        //         cart.push(payload.item)
        //         return { ...state, cart }
        //     } else {
        //         let currentItem = cart.filter(item => item._id + item.sizeSelected.name === payload.itemId)
        //         console.log(currentItem)
        //         if (currentItem[0].countSelected + payload.item.countSelected <= currentItem[0].sizeSelected.left) {
        //             currentItem[0].countSelected += payload.item.countSelected
        //         }
        //         else if (currentItem[0].countSelected < payload.item.countSelected) {
        //             currentItem[0].countSelected = payload.item.countSelected
        //         }
        //         return { ...state, cart }
        //     }

        // case 'EDIT_ITEM':
        //     //console.log('id:' + payload._id + ' name: ' + payload.sizeSelected.name)
        //     return {
        //         ...state,
        //         cart: state.cart.map(item => {
        //             if (item._id + item.sizeSelected.name !== payload.item._id + payload.item.sizeSelected.name) {
        //                 console.log('שונה')
        //                 // This isn't the item we care about - keep it as-is
        //                 return item
        //             }
        //             console.log('שווה')
        //             // Otherwise, this is the one we want - return an updated value
        //             return {
        //                 ...item,
        //                 countSelected: payload.value
        //             }
        //         })
        //     }
        // case 'REMOVE_FROM_CART':
        //     console.log(payload)
        //     return {
        //         ...state, cart: state.cart.filter(item =>
        //             item._id + item.sizeSelected.name !== payload)
        //     }

        // case 'ADD_TO_WISHLIST':
        //     return { ...state, wishList: [...state.wishList, payload], ...state.items }
        // case 'REMOVE_FROM_WISHLIST':
        //     return { ...state, wishList: state.wishList.filter(id => id !== payload), ...state.items }

        // case 'MOUSE_OVER':
        //     return {
        //         ...state, selected: state.selected.map(item => {
        //             if (item._id === payload) {
        //                 return { ...item, currentImage: 1 }
        //             } else {
        //                 return item
        //             }
        //         })
        //     }
        // case 'MOUSE_OUT':
        //     return {
        //         ...state, selected: state.selected.map(item => {
        //             if (item._id === payload) {
        //                 return { ...item, currentImage: 0 }
        //             } else {
        //                 return item
        //             }
        //         })
        //     }
        default: return state
    }
}

export default mainReducer;