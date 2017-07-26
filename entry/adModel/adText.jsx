/**
 * Created by douxiaobin on 17/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
import { render} from 'react-dom'

var ProxyQ = require('../../components/proxy/ProxyQ')

var AdText = React.createClass({

    render:function(){
        var mainContent = null;



        mainContent=
            <div>
                <div className="container">

                    <div>
                        <h1 style={{textAlign:'center', fontSize:'xx-large',color: '#eb6794'}}>羽毛球热暑期培训班/夏令营</h1>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>如今，大部分孩子生活在父母和祖辈的呵护之下成长，随着社会的进步，科技的发展与发达，逐渐退却了我们原本应有的基本生存技能，孩子目前的独立生活能力越来越低，对祖辈、父辈的依赖也越来越强烈，失去了自我。</span>
                        </p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>是否想让孩子度过一个关于快乐、关于拼搏、关于羽毛球的暑期。</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>运动热体育羽毛球夏令营，在这里我们与山东体育学院通力合作，打造一个全济南最独特最具有体育氛围的夏令营。</span>
                        </p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>让孩子感受大学校园的氛围是我们的初衷，让孩子快速的提高羽毛球技战术水平是我们的目标，让孩子学会独立、学会拼搏是我们的希望。</span>
                        </p>
                        <p style={{margin:'5pt 0pt'}}><span  style={{color:'#548dd4',fontFamily:'宋体',fontSize:'12pt'}}>这个夏天 加入我们吧！</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>运动热体育携手山东体育学院举行 “羽毛球夏令营” ，让孩子们感受到大学校园的氛围是我们的初衷，让孩子们快速的提高羽毛球技战术水平是我们的目标，让孩子们学会独立、学会拼搏是我们的希望！</span>
                        </p>
                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>夏令营时间</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>每期2800元。</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>第一期：7月03日—7月12日（已报满）</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>第二期：7月17日—7月26日（招生中……）</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>第三期：7月31日—8月09日（招生中……）</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>第四期：8月14日—8月23日（招生中……）</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>7:00-8:00早饭</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>8:40-11:40训练馆训练</span></p>
                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>暑假期课</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>时间：2017年7月13日-2017年8月25日期间</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>共计20课时，周一到周五，周末休息。</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>上午8:30—10:30 </span><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>&#xa0;</span><span style={{fontFamily:'宋体',fontSize:'11pt'}}> </span><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>&#xa0;</span><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>下午15:00—17:00</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>送一套训练服。</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>学生自由选择时间，随到随学，学满20课时为准。</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>价格：1350元</span></p>

                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>焦点体验</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>1、激发孩子兴趣，提高运动能力与羽毛球技术</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'12pt'}}>2、提高勇气、拓展孩子的知识面、</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>3、培养孩子坚韧不拔，永不放弃的奋斗精神、</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>4、让孩子掌握最基础的自主生活与集体生活能力、培养团队精神</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>5、认识新朋友，加强孩子的沟通能力，直接提升孩子的社交能力</span></p>
                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>招生对象</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>年满 6 周岁到14周岁 ，自愿参加羽毛球夏令营的健康青少年</span></p>
                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>温馨提示【注意事项】</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>1、本次夏令营羽毛球培训、生活与学习全程由专业教练导师指导，孩子独自完成，家长不在陪同行列、</span><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>&#xa0;</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>2、、营地生活，安全第一，请在出发参加营地活动之前，引导及教育孩子全程听从各组教练的指引。 学习过程如需帮助，请向各组教练或助教提出，孩子将获得悉心的协助和指引</span>
                        </p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>3、注意安全，听从教练导师安排，严禁迟到，严禁擅自冒险行动、离队、安全自负</span>
                        </p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>4、注重环保，不乱扔杂物。 （每人自备一杂物袋）塑料袋、、途中产生的垃圾的物品一律全部要带出</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>5、本次活动以羽毛球为主，请听从导师安排</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>6、队员之间须相互体谅，有重大决定或提议由大家协商，但教练有最终决定权</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>7、报名成功以完成支付为准，逾期未支付将视为放弃该活动名额</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>8、报名总人数未达到活动组团要求，活动自动取消，全额退款，活动前一天通知</span>
                        </p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>9、暴雨、如在活动进行中遇到不可抗力因素（如台风、停电、）导致活动无法正常进行，教练可根据当时情况进行活动应急调整方案</span>
                        </p>
                        <p style={{backgroundColor:'#eb6794',borderLeftColor:'#f194b4',borderLeftStyle:'solid',borderLeftWidth:'6pt',lineHeight:'18.75pt',margin:'7.5pt 0pt', paddingLeft:'8pt'}}>
                            <span style={{color:'#ffffff',fontFamily:'宋体',fontSize:'12pt'}}>报名方式</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>1、到所在场地分点报名及交费</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>2、报名联系人:</span><span
                            style={{fontFamily:'宋体',fontSize:'11pt'}}>&#xa0;</span></p>
                        <p style={{margin:'5pt 0pt',textIndent:'25px'}}><span style={{fontFamily:'宋体',fontSize:'11pt'}}>3、支付方式：微信支付、支付宝支付、银行转账</span></p>
                        <p style={{margin:'0pt', orphans:'0', textAlign:'justify', widows:'0'}}><span style={{fontFamily:'Calibri',fontSize:'10.5pt'}}>&#xa0;</span>
                        </p></div>
                </div>
            </div>



        return mainContent

    },
});

module.exports=AdText;