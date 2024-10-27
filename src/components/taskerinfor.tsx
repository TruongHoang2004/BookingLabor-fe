export default function TaskerInfor() {
    return (
        <div
            style={{
                width: '250px',
                height: '250px',
                textAlign: 'center',
                color: 'black',
                fontSize: '15px',
                fontWeight: 300,
                fontFamily: 'Inter',
                lineHeight: '24px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: 'linear-gradient(to right, #c1dfc4,#deecdd)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '15px',
                marginLeft: '630px',
                padding: '10px',
            }}
        >
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                border: '2px solid #ccc',
            }}>
                <img
                    src="https://b.fssta.com/uploads/application/soccer/headshots/885.vresize.350.350.medium.19.png"
                    alt="Tasker"
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain'
                    }}
                />
            </div>
            <h2 style={{ margin: '5px 0' }}>Lê Văn Bảy</h2>
            <p><strong>Email:</strong> baychobochay@example.com</p>
            <p><strong>Phone:</strong> (+000) 782 321 589</p>
            <p><strong>Social media:</strong></p>
        </div>
    );
}
