import React from 'react';
import HistoryItem from './HistoryItem';

const HistoryList = props => {
    return (
        <div>
            {props.items.map(history => 
                    <HistoryItem 
                        key={history.id} 
                        text={history.text}
                        sql={history.Query}
                    />
                )}
        </div>
    )
}

export default HistoryList;