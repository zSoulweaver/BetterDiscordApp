const { WebpackModules } = require('../../');
const React = WebpackModules.getModuleByNameSync('React', true);

class SidebarHeader extends React.Component {

    render() {
        const { text } = this.props;
        return (
            <div className='bd-header'>{text}</div>
        );
    }

}

class SidebarItem extends React.Component {

    render() {
        const { text, active } = this.props;
        return (
            <div className={`bd-item${active ? ' active' : ''}`}>{text}</div>
        );
    }

}

class Sidebar extends React.Component {

    render() {
        return (
            <div className='bd-sidebar'>
                {this.props.children}
            </div>
        );
    }

}

module.exports = {Sidebar, SidebarHeader, SidebarItem}