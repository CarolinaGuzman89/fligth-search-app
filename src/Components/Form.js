
import {React, useState}from "react"
import { Formik, Form, Field, useField, useFormikContext} from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AirportsCodes from "../Mocks/AirpotsCode";
import Select from 'react-select';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";




const DatePickerField = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);
    return (
        <DatePicker
            dateFormat="yyyy/MM/dd"
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
            setFieldValue(field.name, val);
            }}
        />
        );
};


function SelectField(props) {
    

    const [field, state, {setValue, setTouched}] = useField(props.field.name);

    const onChange = ({value}) => {
        setValue(value);
    };
    return (
        <Select 
        {...props} 
        onChange={onChange} 
        onBlur={setTouched}
        />
    );
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

 export function encodeQueryData(data) {
    let result = [];
    for (let d in data)
    result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return result.join('&');
}


export default function SearchForm() { 
    
    const [startDate, setStartDate] = useState(new Date());
    let departureDate = new Date();
    let returnDate = new Date(); 
    
    

    const newSchema = Yup.object({
        originLocationCode: Yup.string().required(),
        destinationLocationCode: Yup.string().required(),
        departureDate: Yup.date().required(),
        returnDate: Yup.date().required(),
        adults: Yup.number().required()
    })

    const [datos, setDatos] = useState([])

    
    
    

    const navigate = useNavigate();
    function redirect() {
        navigate("/FligthResults", { replace: true });
    }

        
    return (
        <div className="relative z-10" >
            <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
            <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                    <Formik
                        initialValues = {{ 
                            originLocationCode: "", 
                            destinationLocationCode: "", 
                            adults: 0, 
                            children: 0, 
                            departureDate , 
                            returnDate} }
                        // onSubmit: función que recibirá el valor final del form
                        onSubmit= {async (values) => {
                            await sleep(500);
                            const respuesta = JSON.stringify(values, null, 2);
                            const obj = JSON.parse(respuesta)
                            var data = {
                                adults: obj.adults,
                                children: obj.children,
                                departureDate: obj.departureDate.slice(0,10),
                                destinationLocationCode: obj.destinationLocationCode,
                                originLocationCode: obj.originLocationCode,
                                returnDate: obj.returnDate.slice(0,10),
                            }
                            console.log(data)
                            var querystring = encodeQueryData(data);
                            console.log('https://test.api.amadeus.com/v2/shopping/flight-offers?' + querystring);
                            redirect()
                        }}
                        validationSchema={newSchema}
                    >
                    {({ isSubmitting }) => (
                        <Form  className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div className="mt-3 text-center sm:mt-5"> 
                                    <h2 as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Buscar tu proximo vuelo 
                                    </h2>
                                    <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Completa los siguientes datos para iniciar la busqueda. 
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">  
                                <div>
                                    <label htmlFor="date">Origen </label>
                                    <div className="mt-1">
                                        <Field
                                            name="originLocationCode"
                                            id="originLocationCode"
                                            type="string"
                                            //className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                            options={AirportsCodes.map(airport => ({ value: airport.code, label: airport.code + ", "+ airport.name  + ", "+ airport.country }))}
                                            component={SelectField}
                                        />
                                    </div>
                                    
                                </div>
                                <div>
                                    <label htmlFor="date">Destino</label>
                                        <div className="mt-1">
                                        <Field
                                            name="destinationLocationCode"
                                            id="destinationLocationCode"
                                            type="string"
                                            //className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                            options={AirportsCodes.map(airport => ({ value: airport.code, label: airport.code + ", "+ airport.name  + ", "+ airport.country }))}
                                            component={SelectField}
                                        />
                                    </div>
                                </div>   
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                
                                <div>
                                <label htmlFor="date">Salida</label>
                                    <div className="mt-1">
                                    <DatePickerField 
                                        name="departureDate"  
                                        id="departureDate"
                                        type="date"  
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)} 
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                    </div>
                                </div>
                                <div>
                                <label htmlFor="date">Regreso</label>
                                    <div className="mt-1">
                                    <DatePickerField 
                                        id="returnDate" 
                                        name="returnDate" 
                                        type="date" 
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)} 
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                    </div>
                                </div>   
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">  
                                <div>
                                    <label htmlFor="date">Adultos </label>
                                    <div className="mt-1">
                                        <Field
                                            name="adults"
                                            id="adults"
                                            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                            type="number"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="date">Niños</label>
                                        <div className="mt-1">
                                        <Field
                                            name="children"
                                            id="children"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                            type="number"
                                        />
                                    </div>
                                </div>  
                            </div> 
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense"> 
                                <button type="submit"  disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Buscar
                                </button>
                            </div>
                        </Form>
                    )}    
                    </Formik>
                </div>
            </div>
        </div>
    )
}


