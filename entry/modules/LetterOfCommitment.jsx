import React from 'react';
import {render} from 'react-dom';
var SyncStore = require('../../components/flux/stores/SyncStore');
var ProxyQ=require('../../components/proxy/ProxyQ.js');

import { Table} from 'react-bootstrap';
var LetterOfCommitment =React.createClass({
    healthyInfoExamineFormDownload:function () {

        var headers={
            "Authorization":"Bearer "+SyncStore.getToken(),
        }
        var url="/node/download"
        var data={
            request:"test"
        }
        ProxyQ.querymy(
            url,
            null,
            null,
            data,
            headers,
            function(ob) {
                var a=ob.data
            }.bind(this)
        )
    },
    render:function(){
        return (
            <div style={{borderStyle: 'double', borderColor: '#2f8dbc'}}>
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th colSpan={4} style={{textAlign:'center'}}>山东大学研究生学术规范试题</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{lineHeight: 'inherit'}} colSpan={2}>
                            <p>针对近年来研究生培养和学位授予中出现的一些学术不端行为和学术失范现象,请您对收下现象作出判断.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            1．学术失范仅仅是道德问题，不会受到学校的处分。
                        </td>
                        <td>
                            <input type="radio" name="1"/>对
                            <input type="radio" name="1" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            2．在学位论文或公开发表的作品中，使用指导教师或授课教师的成果可不加注明。
                        </td>
                        <td>
                            <input type="radio" name="2"/>对
                            <input type="radio" name="2" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            3．将教师的讲义、课堂记录整理后可以署名发表。
                        </td>
                        <td>
                            <input type="radio" name="3"/>对
                            <input type="radio" name="3" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            4．从他人学术成果中转引第三人的成果，不需要列出参考文献。
                        </td>
                        <td>
                            <input type="radio" name="4"/>对
                            <input type="radio" name="4" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            5．研究生所发表的学术论文标注为“山东大学”承担或设立的基金项目资助时，不须经项目负责人书面授权，导师同意即可。
                        </td>
                        <td>
                            <input type="radio" name="5"/>对
                            <input type="radio" name="5" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            6．论文写作的引文只要不构成个人学术成果的主要部分和实质内容，就可以随意引用他人成果，且不必注明出处。
                        </td>
                        <td>
                            <input type="radio" name="6"/>对
                            <input type="radio" name="6" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            7．为增加个人学术成果数量，将内容相同的论文在改头换面后，可以在不同的学术期刊上先后发表。
                        </td>
                        <td>
                            <input type="radio" name="7"/>对
                            <input type="radio" name="7" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            8．研究生在读期间取得的重要科研结果或科学发现，可以不经导师许可私自转让。
                        </td>
                        <td>
                            <input type="radio" name="8"/>对
                            <input type="radio" name="8" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            9．取得的重大学术成果，可以直接向媒体发布。
                        </td>
                        <td>
                            <input type="radio" name="9"/>对
                            <input type="radio" name="9" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td>
                            10．在学术研究中获得的全部实验结果和调查资料等，离校时不需要转交导师或实验室，可自行支配。
                        </td>
                        <td>
                            <input type="radio" name="10"/>对
                            <input type="radio" name="10" style={{marginLeft:'10px'}}/>错
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{lineHeight:'25px'}}>
                            <h3 style={{textAlign:'center'}}>山东大学研究生遵守学术规范承诺书</h3>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为弘扬求真务实的创新精神，营造严谨踏实的优良学风，规范学术行为，严明学术纪律。作为山东大学的研究生，本人承诺严格遵守《山东大学研究生学术规范》，自觉做到：</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 在学习和科学研究中遵循科学规律，遵守学术道德、学术纪律和学术规范，遵守学术界公认的伦理准则。实事求是、刻苦学习、努力钻研、勇于创新、团结协作、尊敬导师，尊重前人的知识成果。凡署名&ldquo;山东大学&rdquo;及导师所发表的学术成果，一定征得导师同意并保持原始资料、记录的真实、可靠、完整；随时接受检验。</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 如有违反《山东大学研究生学术规范》或其他公认的学术准则的行为，本人愿接受学校的相应处分。</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign:'right'}}>承诺人：</td>
                        <td>
                            <input/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <button onClick={this.healthyInfoExamineFormDownload}>test</button>
            </div>

        )
    }
});

module.exports=LetterOfCommitment;