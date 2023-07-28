

import React from "react"
import ContentLoader from "react-content-loader"


export const MyLoader = ({props}) => (
    <div className="bg-gray-300 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ContentLoader 
                speed={2}
                width={1800}
                height={850}
                viewBox="0 0 1800 850"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="133" y="39" rx="0" ry="0" width="0" height="7" /> 
                <rect x="109" y="36" rx="0" ry="0" width="0" height="5" /> 
                <rect x="155" y="45" rx="0" ry="0" width="0" height="5" /> 
                <rect x="240" y="31" rx="0" ry="0" width="1" height="13" /> 
                <rect x="55" y="34" rx="0" ry="0" width="6" height="0" /> 
                <rect x="27" y="17" rx="0" ry="0" width="530" height="101" /> 
                <rect x="357" y="188" rx="0" ry="0" width="0" height="1" /> 
                <rect x="28" y="137" rx="0" ry="0" width="530" height="101" /> 
                <rect x="29" y="257" rx="0" ry="0" width="530" height="101" /> 
                <rect x="29" y="378" rx="0" ry="0" width="530" height="101" /> 
                <rect x="28" y="498" rx="0" ry="0" width="530" height="101" /> 
                <rect x="27" y="618" rx="0" ry="0" width="530" height="101" /> 
                <rect x="27" y="738" rx="0" ry="0" width="530" height="101" />
            </ContentLoader>
        </div>
    </div>
    )

export default MyLoader