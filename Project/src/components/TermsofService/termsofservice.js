import React, { Component } from 'react';
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react';
import Footer from '../Footer/Footer'
class termsOfService extends Component {
  //defining the state
  state = { visible: false }

  //defining a handle for displaying the sidebar
  handleSideBar = () => {
    if(this.state.visible) {
      this.setState({ visible: false })
    } else {
      this.setState({ visible: true })
    }
  } 

  //defining handles for clicking button and hiding sidebar
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })
  render() {
    const { visible } = this.state
    return(
      <div>
          <Button disabled={visible} onClick={this.handleSideBar}>
            Table of Contents
          </Button>
         <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='side along'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item>
              <a href = '#intro'>Introduction</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#intellect'>Intellectual Property Rights</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#restrict'>Restrictions</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#content'>Your Content</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#warranty'>No Warranties</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#limit'>Limitation of Liability</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#indem'>Indemnification</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#sever'>Severability</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#vary'>Variation of Terms</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#assign'>Assignment</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#entire'>Entire Agreement</a>
            </Menu.Item>
            <Menu.Item>
              <a href = '#law'>Governing Law and Jurisdiction</a>
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible} onMouseOver={this.handleSidebarHide}>
            <Segment basic>
              <Header as='h1'>Terms of Service</Header>
              <Header as='h3' id = 'intro'>1. Introduction.</Header>
              <p>These Website Standard Terms And Conditions (these “Terms” or these “Website Standard Terms And Conditions”) contained herein on this webpage, shall govern your use of this website, including all pages within this website (collectively referred to herein below as this “Website”). These Terms apply in full force and effect to your use of this Website and by using this Website, you expressly accept all terms and conditions contained herein in full. You must not use this Website, if you have any objection to any of these Website Standard Terms And Conditions.</p>
              <Header as='h3' id = 'intellect'>2. Intellectual Property Rights.</Header>
              <p>Other than content you own, which you may have opted to include on this Website, under these Terms, [COMPANY NAME] and/or its licensors own all rights to the intellectual property and material contained in this Website, and all such rights are reserved.</p>
              <Header as='h3' id = 'restrict'>3. Restrictions.</Header>
              <p>Certain areas of this Website are restricted from access by you and [COMPANY NAME] may further restrict access by you to any areas of this Website, at any time, in its sole and absolute discretion.  Any user ID and password you may have for this Website are confidential and you must maintain confidentiality of such information.</p>
              <Header as='h3' id = 'content'>4. Your Content.</Header>
              <p>In these Website Standard Terms And Conditions, “Your Content” shall mean any audio, video, text, images or other material you choose to display on this Website. With respect to Your Content, by displaying it, you grant [COMPANY NAME] a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
              <p>Your Content must be your own and must not be infringing on any third party’s rights. [COMPANY NAME] reserves the right to remove any of Your Content from this Website at any time, and for any reason, without notice.</p>
              <Header as='h3' id = 'warranty'>5. No Warranties.</Header>
              <p>This Website is provided “as is,” with all faults, and [COMPANY NAME] makes no express or implied representations or warranties, of any kind related to this Website or the materials contained on this Website. Additionally, nothing contained on this Website shall be construed as providing consult or advice to you.</p>
              <Header as='h3' id = 'limit'>6. Limitation of Liability.</Header>
              <p>In no event shall [COMPANY NAME], nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and [COMPANY NAME], including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
              <Header as='h3' id = 'indem'>7. Indemnification.</Header>
              <p>You hereby indemnify to the fullest extent [COMPANY NAME] from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these Terms.</p>
              <Header as='h3' id = 'sever'>8. Severability.</Header>
              <p>If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.</p>
              <Header as='h3' id = 'vary'>9. Variation of Terms.</Header>
              <p>[COMPANY NAME] is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this Website.</p>
              <Header as='h3' id = 'assign'>10. Assignment.</Header>
              <p>[COMPANY NAME] shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification or consent required. However, .you shall not be permitted to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
              <Header as='h3' id = 'entire'>11. Entire Agreement.</Header>
              <p>These Terms, including any legal notices and disclaimers contained on this Website, constitute the entire agreement between [COMPANY NAME] and you in relation to your use of this Website, and supersede all prior agreements and understandings with respect to the same.</p>
              <Header as='h3' id = 'law'>12. Governing Law and Jurisdiction.</Header>
              <p>These Terms will be governed by and construed in accordance with the laws of the State of [STATE], and you submit to the non-exclusive jurisdiction of the state and federal courts located in [STATE] for the resolution of any disputes.</p>
            
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <Footer />
      </div>
    )
  }
}

export default termsOfService;
