import typesOfAction from '../constant/constant';

const initalState={
    userAuthSignUp: '',
    userSignUp :'',
    userSignIn : '',
    error : '',
    success : '',
    productData : [],
    applyforjob: '',
    ApplicantsData : []
}



export default (state= initalState , action) =>{
    switch(action.type){
        case typesOfAction.users:
        return({
            ...state,
            userAuth: action.payload
        })

        case typesOfAction.userSignUp:
        return({
            ...state,
            userSignUp : action.payload
        })
        
        case typesOfAction.userSignIn:
        return({
            ...state,
            userSignIn: action.payload
        })

        case typesOfAction.productData:
        return({
            ...state,
            productData : action.payload
        })

        case typesOfAction.ApplicantsData:
        return({
            ...state,
            ApplicantsData: action.payload
        })
        default:
    }
   
    return state
}

