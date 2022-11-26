var score = 0;
var done = [];
var currentProblem = -1;
var NUM_PROBLEMS = 19;
var MAX_STEPS = 12;
var DONE_SEPARATOR = "|";
var ANSWER_BANK = {'outcome1_1': 2, 'outcome1_2': 1, 'outcome1_3': 0, 'outcome2_1': 0, 'outcome2_2': 0, 'outcome2_3': 2, 'outcome3_1': 0, 'outcome3_2': 0, 'outcome3_3': 2, 'outcome4_1': 1, 'outcome4_2': 2, 'outcome4_3': 0, 'outcome5_1': 0, 'outcome5_2': 0, 'outcome5_3': 2, 'outcome6_1': 0, 'outcome6_2': 1, 'outcome6_3': 2, 'outcome7_1': 1, 'outcome7_2': 1, 'outcome7_3': 2, 'outcome8_1': 0, 'outcome8_2': 0, 'outcome8_3': 2, 'outcome9_1': 0, 'outcome9_2': 1, 'outcome9_3': 2, 'outcome10_1': 1, 'outcome10_2': 2, 'outcome10_3': 0, 'outcome11_1': 0, 'outcome11_2': 2, 'outcome11_3': 0, 'outcome12_1': 0, 'outcome12_2': 2, 'outcome12_3': 0, 'outcome13_1': 2, 'outcome13_2': 1, 'outcome13_3': 0, 'outcome14_1': 0, 'outcome14_2': 0, 'outcome14_3': 2, 'outcome15_1': 0, 'outcome15_2': 0, 'outcome15_3': 2, 'outcome16_1': 1, 'outcome16_2': 0, 'outcome16_3': 2, 'outcome17_1': 0, 'outcome17_2': 0, 'outcome17_3': 2, 'outcome18_1': 2, 'outcome18_2': 2, 'outcome18_3': 0, 'outcome19_1': 2, 'outcome19_2': 0, 'outcome19_3': 1}

document.addEventListener('DOMContentLoaded', function()
{
    var inputParams = new URLSearchParams(new URL(window.location.href).search);
    var kiddingWrapper = document.getElementById("kiddingWrapper");
    var kiddingTable = document.getElementById("kidding_table");
    switch(inputParams.get("phase") || "home")
    {
        case "home":
            document.getElementById("copyright_padding").style = "height: 50px";
            document.getElementById("copyright").style = "";
            kiddingWrapper.style = "width: 622px; border:2px solid #000; padding: 0";
            kiddingTable.style = "width: 622px;";
            kiddingTable.innerHTML = `
            <tr><td colspan="4"><img src="assets/title03.gif" width="622" height="109" hspace="0" vspace="0" border="0" alt="You've Got To Be Kidding" /></td></tr><tr><td colspan="2"><img src="assets/treetop.gif" width="283" height="49" hspace="0" border="0" alt=""></td><td rowspan="2" ><img src="assets/treeright.gif" width="121" height="245" hspace="0" vspace="0" border="0" alt=""></td><td rowspan="2"><img src="assets/introtext.gif" width="218" height="245" hspace="0" vspace="0" border="0" alt="Climb the Tree! Solve real problems by choosing the best advice."></td></tr><tr><td><img src="assets/kids.gif" width="206" height="196" hspace="0" vspace="0" border="0" alt="" /></td><td><img src="assets/treemiddle.gif" width="77" height="196" hspace="0" vspace="0" border="0" alt=""></td></tr><tr><td colspan="4"><img src="assets/treebottom.gif" width="479" height="126" hspace="0" vspace="0" border="0" alt=""><a href="index.html?phase=start"><img src="assets/start.gif" name="start" border="0" alt=""></a></td></tr>
            `
            break;
        case "start":
        case "next":
            score = Number(inputParams.get("score")) || 0;
            done = inputParams.get("done") || "";
            done = (done == "" ? [] : done.split(DONE_SEPARATOR));
            if (done.length >= (NUM_PROBLEMS / 2)) done.shift(0);

            while (currentProblem < 0 || done.indexOf(currentProblem.toString()) >= 0)
            {
                currentProblem = Math.floor(Math.random() * NUM_PROBLEMS);
            }
            done.push(currentProblem.toString());

            kiddingWrapper.style = "width: 643px;";
            kiddingTable.style = "width: 643px;";
            kiddingTable.innerHTML = `
            <tr align="left" valign="top">
                <td align="left" valign="top" bgcolor="#FFFFFF">                
                    <img src="assets/problem` + (currentProblem + 1) + `.gif" width="283" height="245" border="0"><br>
                    <img src="assets/tip` + (currentProblem + 1) + `.gif" width="283" height="65" border="0">
                </td>
                <td valign="bottom">
                    <a href="` + on_continue_outcome(0) + `" onmouseover="rollover_mouseover('choice1'); return true;" onmouseout="rollover_mouseout('choice1'); window.status = ''; return true;"><img src="assets/choice1_` + (currentProblem + 1) + `.gif" width="354" height="97" border="0" id="choice1"></a><br>
                    <a href="` + on_continue_outcome(1) + `" onmouseover="rollover_mouseover('choice2'); return true;" onmouseout="rollover_mouseout('choice2'); window.status = ''; return true;"><img src="assets/choice2_` + (currentProblem + 1) + `.gif" width="354" height="97" border="0" id="choice2"></a><br>
                    <a href="` + on_continue_outcome(2) + `" onmouseover="rollover_mouseover('choice3'); return true;" onmouseout="rollover_mouseout('choice3'); window.status = ''; return true;"><img src="assets/choice3_` + (currentProblem + 1) + `.gif" width="354" height="97" border="0" id="choice3"></a>
                </td>
                <td width="6"><img src="assets/1px.gif" width="6" alt=""></td>
            </tr>
            `
            break;
        case "outcome":
            var selectedProblem = Number(inputParams.get("problem"));
            var selectedAnswer = Number(inputParams.get("choice"));
            var outcomeName = "outcome" + (selectedProblem + 1) + "_" + (selectedAnswer + 1);
            var changeInScore = ANSWER_BANK[outcomeName];
            score = (Number(inputParams.get("score")) || 0) + changeInScore;
            done = (inputParams.get("done") || "").split(DONE_SEPARATOR);

            kiddingTable.innerHTML = `
            <tr align="left" valign="top">
                <td align="left" valign="top" bgcolor="#FFFFFF">
                <img src="assets/top.gif" width="354" height="123" border="0"><br>
                <img src="assets/choice` + (selectedAnswer + 1) + `_` + (selectedProblem + 1) + `.gif" width="354" height="97" border="0"><br>
                <img src="assets/1px.gif" width="354" height="151" border="0"></td>
                <td valign="top"><img src="assets/` + outcomeName + `.gif" width="283" height="271" border="0"><br>
                <a href="index.html?phase=score&amp;done=` + done.join(DONE_SEPARATOR) + `&amp;score=` + score + `"><img src="assets/move` + changeInScore + `.gif" alt="Your Score" width="283" height="41" border="0" name=""></a>
                <!-- outcome content ends here -->
                </td>
                <td width="6"><img src="assets/1px.gif" width="6" alt=""></td>
            </tr>
            `
            break;
        case "score":
            score = Number(inputParams.get("score")) || 0;
            done = (inputParams.get("done") || "").split(DONE_SEPARATOR);

            kiddingWrapper.style = "width: 637px;";
            kiddingTable.style = "width: 637px;";
            if (score >= MAX_STEPS)
            {
                document.getElementById("copyright_padding").style = "height: 20px";
                document.getElementById("copyright").innerHTML = "<a id='restart' href='index.html'>Click to restart</a>"
                document.getElementById("copyright").style = "";

                kiddingTable.innerHTML = `
                <tr>
                    <td><img src="assets/title03.gif" width="622" height="109" hspace="0" vspace="0" border="0" alt="You've Got To Be Kidding"></td>
                </tr>
                <tr align="left">
                    <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tr align="left">
                            <td>
                                <table border="0" width="" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td colspan="2"><img src="assets/treetop.gif" width="283" height="49" hspace="0" vspace="0" border="0" alt=""></td>
                                </tr>
                                <tr>
                                    <td align="left"><img src="assets/kidsanim.gif" width="206" height="196" hspace="0" vspace="0" border="0" alt=""></td>
                                    <td align="left"><img src="assets/treemiddle.gif" width="77" height="196" hspace="0" vspace="0" border="0" alt=""></td>
                                </tr>
                            </table>
                            </td>
                            <td><img src="assets/treeright.gif" width="121" height="245" hspace="0" vspace="0" border="0" alt=""></td>
                            <td><img src="assets/endtext.gif" width="218" height="245" hspace="0" vspace="0" border="0" alt="Well done! You made it to the treehouse!"></td>
                        </tr>
                    </table>
                    </td>
                </tr>
                <tr>
                    <td><img src="assets/treebottom.gif" width="479" height="126" hspace="0" vspace="0" border="0" alt=""><img src="assets/1px.gif" name="start" border="0" alt=""></td>
                </tr>
                <tr>
                    <td height="6"><img src="assets/1px.gif" height="6" alt=""></td>
                </tr>
                `
            }
            else
            {
                kiddingTable.innerHTML = `
                <tr align="left">
                    <td colspan="2">
                        <img height="109" width="637" vspace="0" border="0" align="left" alt="You've GOT To Be Kidding! A game for kids and grownups" src="assets/title02.gif"/>
                    </td>
                </tr>
                <tr align="left" valign="top">
                    <td align="left" valign="top" bgcolor="#FFFFFF">
                        <!-- game content starts here -->
                        <table border="0" cellspacing="0" cellpadding="0" width="283">
                            <tr align="left">
                                <td width="283" colspan="3"><img src="assets/scoretreetop.gif" alt="" width="283" height="151" border="0" align="left" hspace="0" vspace="0"></td>
                                <td rowspan="3"><img src="assets/scoretreeleft.gif" alt="" width="63" height="338" border="0" align="left" hspace="0" vspace="0"></td>
                            </tr>
                            <tr align="left">
                                <td><img src="assets/you.gif" width="112" height="54" border="0" align="left" hspace="0" vspace="0"></td>
                                <td><img src="assets/` + (MAX_STEPS - score) + `_step.gif" width="113" height="54" border="0" align="left" hspace="0" vspace="0"></td>
                                <td><img src="assets/go.gif" width="58" height="54" border="0" align="left" hspace="0" vspace="0"></td>
                            </tr>
                            <tr align="left">
                                <td width="283" colspan="3"><img src="assets/leftover.gif" width="283" height="133" border="0" align="left" hspace="0" vspace="0"></td>
                            </tr>
                        </table>
                    </td>
                    <td valign="top" align="left">
                        <table cellspacing="0" cellpadding="0" border="0" width="291">
                        <tr align="left">
                            <td rowspan="2" align="left" width="63" height="338"><img src="assets/stairs` + score + `.gif" width="63" height="338" border="0" alt="" hspace="0" vspace="0" align="left"></td>
                            <td align="left" width="228" height="271"><img src="assets/scoretreeright.gif" border="0" alt="" width="228" height="271" hspace="0" vspace="0" align="left"></td>
                        </tr>
                        <tr align="left">
                            <td align="left" width="228" height="67" bgcolor="#339933">
                            <a href="index.html?phase=next&amp;score=` + score + `&amp;done=` + done.join(DONE_SEPARATOR) + `"><img src="assets/next.gif" width="228" height="67" border="0" alt="" hspace="0" vspace="0" align="left" name="next"></a>
                            </form>
                            </td>
                        </tr>
                        </table>
                    </td>
                </tr>
                `
            }
            
            break;
    }
});

function rollover_mouseover(image_id)
{
    document.getElementById(image_id).src = "assets/" + image_id + "_" + (currentProblem + 1) + "_roll.gif"
}

function rollover_mouseout(image_id)
{
    document.getElementById(image_id).src = "assets/" + image_id + "_" + (currentProblem + 1) + ".gif"
}

function on_continue_outcome(choice)
{
    return "index.html?phase=outcome&problem=" + currentProblem + "&done=" + done.join(DONE_SEPARATOR) + "&choice=" + choice + "&score=" + score
}