import Table from 'react-bootstrap/Table';
import './Main.css'
function Bloodrepresent() {
  return (
    <Table id='table' striped bordered hover>
      <thead>
        <tr>
          <th>Blood Group</th>
          <th>Can Donate To</th>
          <th>Can Receive From</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A+</td>
          <td>A+, AB+</td>
          <td>A+, A−, O+, O−</td>
        </tr>
        <tr>
          <td>A−</td>
          <td>A+, A−, AB+, AB−</td>
          <td>A−, O−</td>
        </tr>
        <tr>
          <td>B+</td>
          <td>B+, AB+</td>
          <td>B+, B−, O+, O−</td>
        </tr>
        <tr>
          <td>B−</td>
          <td>B+, B−, AB+, AB−</td>
          <td>B−, O−</td>
        </tr>
        <tr>
          <td>AB+</td>
          <td>AB+</td>
          <td>All Blood Types</td>
        </tr>
        <tr>
          <td>AB−</td>
          <td>AB+, AB−</td>
          <td>AB−, A−, B−, O−</td>
        </tr>
        <tr>
          <td>O+</td>
          <td>O+, A+, B+, AB+</td>
          <td>O+, O−</td>
        </tr>
        <tr>
          <td>O−</td>
          <td>All Blood Types</td>
          <td>O−</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Bloodrepresent;
