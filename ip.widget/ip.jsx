/**
 * IP Widget for Übersicht
 * 
 * Version: 1.2
 * Last Updated: 01/29/2019
 * 
 * Created by Bert Bredewold
 */

// Get's WAN IP from a dig to OpenDNS
export const command = 'ip.widget/ip.sh';

// Refresh every X miliseconds
export const refreshFrequency = 100000000;

// Base layout
export const className = {
    top: '30px',
    right: '25px',
    color: '#555',
    fontFamily: 'Fira Code Retina',
    fontWeight: 100,
    fontSize: '12px'
}

// Render the widget
export const render = ({output, error}) => {
    if (output) {
        // Collect Interfaces from JSON
        const interfaces = JSON.parse(output).interfaces;

        // Map over the interfaces and construct table contents
        const items = interfaces.map((el) => {
            return (
              <span>
              <span style={{fontWeight: 'bold'}}>{el.iface}:</span>
              <span> {el.address} </span>
              <span style={{fontWeight: '300'}}>{el.cidr ? '/' + el.cidr : ''}</span>
              <span style={{fontWeight: '200'}}>{el.router ? ' -> ' + el.router : ''}</span>
              </span>
              //  <tr key={el.iface}>
              //      <td>{el.iface}: <span>{el.address}</span>
              //      <span style={{color: 'rgba(255,255,255,0.4)'}}>{el.cidr ? '/' + el.cidr : ''}</span>
              //      <span style={{color: 'rgba(255,255,255,0.2)'}}>{el.router ? ' -> ' + el.router : ''}</span></td>
              //  </tr>
            )
        });
    
        // Return the table
        return error ? (
            <div>Oops: <strong>{String(error)}</strong></div>
        ) : (
            <table>
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
}

