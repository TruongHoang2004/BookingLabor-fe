export default function TaskInforInRV() {
    return (
        <div
            style={{
                width: '250px',
                height: '300px',
                textAlign: 'center',
                color: 'black',
                fontSize: '15px',
                fontWeight: 300,
                fontFamily: 'Inter',
                lineHeight: '36px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: '15px',
                marginLeft: '170px',
                padding: '10px',

            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span><strong>Category:</strong></span>
                <span>Education</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span><strong>Address</strong></span>
                <span>New York</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span><strong>Time:</strong></span>
                <span>10:00 AM - 12:00 PM</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span><strong>Duration:</strong></span>
                <span>30 minutes</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <span><strong>Estimated Fee:</strong></span>
                <span>$50</span>
            </div>
        </div>
    );
}
