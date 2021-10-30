import React from "react";
import { Table } from "reactstrap";

const ChatCmdTable = (props) => {
    return (
        <div>
            <Table borderless dark hover size="sm" striped>
                <tbody>
                    <tr>
                        <td>/happy</td>
                        <td>A random happy emoticon</td>
                    </tr>
                    <tr>
                        <td>/shrug</td>
                        <td>A shrugging emoticon</td>
                    </tr>                        
                    <tr>
                        <td>/legion</td>
                        <td>Summon the legion</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default ChatCmdTable;