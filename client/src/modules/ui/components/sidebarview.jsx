const { WebpackModules } = require('../../');
const React = WebpackModules.getModuleByNameSync('React', true);

class SidebarView extends React.Component {

    render() {
        const { sidebar } = this.props;
        return (
            <div className='bd-sidebar-view'>
                <div className='bd-sidebar-region'>
                    <div className='bd-scrollerWrap'>
                        <div className='bd-scroller'>
                            {sidebar}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

module.exports = SidebarView;