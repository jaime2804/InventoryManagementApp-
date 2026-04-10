    function CategoryBadge(props) {

        return (
            <div>

            {props.category === "Electronics" && <span style={{backgroundColor: 'blue', color: 'white', padding: '4px 8px'}}>Electronics</span>}
            {props.category === "Peripherals" && <span style={{backgroundColor: 'green', color: 'white', padding: '4px 8px'}}>Peripherals</span>}
            {props.category === "Audio" && <span style={{backgroundColor: 'orange', color: 'white', padding: '4px 8px'}}>Audio</span>}

            </div>

        )
}

export default CategoryBadge;