
import { Formik, Field, Form } from 'formik';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const encodeQueryData = (data) => {
    let result = [];
    for (let d in data)
    result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return result.join('&');
}

export default function FormPrueba() {


    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
            }}
            onSubmit={async (values) => {
                await sleep(500);
                encodeQueryData(JSON.stringify(values, null, 2));
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" placeholder="Jane" />
        
                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" placeholder="Doe" />
        
                <label htmlFor="email">Email</label>
                <Field name="email" placeholder="jane@acme.com" type="email" />
        
                <button type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
            </Formik>
        </div>
    )
}
