import * as Yup from "yup"

export const OfferSchema = Yup.object().shape({

   OfferedPrice: Yup.number('offer must be number...')
                    .required('offer is valid...')
                    .moreThan(0, 'offer should not be zero or less than zero')

})