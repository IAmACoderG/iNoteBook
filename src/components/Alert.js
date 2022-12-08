import React from 'react'

export default function Alert(props) {
    const { alert } = props
    const capatlized = (word) => {
        if (word === "danger") {
            word = "error"
        }
        let lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: "50px" }} >
            {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capatlized(alert.type)}</strong> :{alert.msg}

            </div>}
        </div>
    )
};
