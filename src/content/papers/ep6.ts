import type { Comprehension, Question } from '../types';
import { c, li, no, ok, out, py, rnd, sh, t, tbl, fig } from '../dsl';

const P = 'ep6';

export const ep6Comprehensions: Comprehension[] = [
  {
    id: 'ep6-c1',
    paperId: P,
    title: 'Course lookup app driven by both a command-line argument and a query string',
    range: '186 to 187',
    stem: [
      t('Consider the following flask application running locally on `http://127.0.0.1:5000`'),
      py(
        `from flask import Flask, request\nimport sys\napp = Flask(__name__)\ndata = ["Java", "Application Development","DBMS"]\n\n@app.route('/course')\ndef home():\n    course = request.args.get('course')\n    if course in sys.argv[1]:\n        if sys.argv[1] in data:\n            return f"Welcome to {sys.argv[1]}!"\n\n        return f"Welcome to {course}!"\n    else:\n        return "Invalid Data"\n\napp.run(debug=True)`,
        'app.py',
      ),
    ],
  },
];

export const ep6Questions: Question[] = [
  {
    id: 'ep6-q156',
    paperId: P,
    number: 156,
    sourceQuestionId: '640653902445',
    type: 'MCQ',
    marks: 3,
    title: 'Match jinja2 render commands with their terminal output',
    topicId: 'jinja-templates',
    subtopicId: 'jinja-basics',
    difficulty: 'moderate',
    stem: [
      t('Consider the following Python code snippet.'),
      py(
        `from jinja2 import Template\nimport sys\ninput_list = sys.argv\nvar_a, var_b = input_list[1], input_list[2]\n\nif input_list[1]=="Meera":\n    var_b = "Data Analyst"\nelif input_list[1]=="Radha":\n    var_b = "Scientist"\nelse:\n    pass\ntemplate = "{{var_a}} is {{var_b}}"\nt = Template(template)\nprint(t.render(var_a = var_a, var_b = var_b))`,
        'file.py',
      ),
      t('Map the commands in column A with the output on the terminal in column B.'),
      tbl(
        ['Column A', 'Column B'],
        [
          ['a) `python file.py Radha Data Analyst`', '1) `Meera is Scientist`'],
          ['b) `python file.py Meera Scientist`', '2) `Sneha is Web`'],
          ['c) `python file.py Sneha Web Developer`', '3) `Meera is Data Analyst`'],
          ['', '4) `Radha is Data Analyst`'],
          ['', '5) `Radha is Scientist`'],
          ['', '6) `Sneha is Web developer`'],
        ],
      ),
    ],
    options: [
      no('6406533039414', 'a - 4, b - 1, c - 6'),
      no('6406533039415', 'a - 5, b - 3, c - 6'),
      no('6406533039416', 'a - 5, b - 1, c - 2'),
      ok('6406533039417', 'a - 5, b - 3, c - 2'),
    ],
    solution: {
      verdict: 'a - 5, b - 3, c - 2.',
      explanation: [
        t('`var_b` is first read from `sys.argv[2]`, then the `if/elif` may overwrite it. Only `sys.argv[1]` and `sys.argv[2]` are ever used — any further words on the command line are ignored.'),
        tbl(
          ['Command', '`sys.argv`', '`var_a`', '`var_b` after the branch', 'Rendered'],
          [
            ['a', "`['file.py','Radha','Data','Analyst']`", '`Radha`', "matches `elif` → `Scientist`", '`Radha is Scientist` (5)'],
            ['b', "`['file.py','Meera','Scientist']`", '`Meera`', "matches `if` → `Data Analyst`", '`Meera is Data Analyst` (3)'],
            ['c', "`['file.py','Sneha','Web','Developer']`", '`Sneha`', "`else: pass` → keeps `argv[2]` = `Web`", '`Sneha is Web` (2)'],
          ],
        ),
        t('Option (c) is where most marks are lost: `Developer` is a separate element of `sys.argv`, so it never reaches the template. It would only be part of `var_b` if the command had quoted it as `"Web Developer"`.'),
      ],
      approach:
        'Write out `sys.argv` as a literal list for each command before doing anything else. Then apply the branch, then render.',
      takeaways: [
        'Unquoted spaces split a command line into separate `sys.argv` entries.',
        '`else: pass` leaves the earlier assignment untouched — it is not a reset.',
      ],
    },
  },
  {
    id: 'ep6-q157',
    paperId: P,
    number: 157,
    sourceQuestionId: '640653902446',
    type: 'MCQ',
    marks: 3,
    title: 'How the browser renders three spans styled by element, id and class',
    topicId: 'html-css',
    subtopicId: 'css-specificity',
    difficulty: 'demanding',
    stem: [
      t('Consider the following HTML document.'),
      c(
        'html',
        `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        span {\n            background-color: yellow;\n            color: red;\n        }\n        #id {\n            border: 2px solid purple;\n            color:blue ;\n            display: inline-block;\n        }\n        .class {\n            background-color: aqua;\n            color: red;\n            display: block;\n            width:20%;\n        }\n    </style>\n</head>\n<body>\n    <span class="class" id="id">SPAN</span>\n    <span class="class" >SPAN</span>\n    <span>SPAN</span>\n</body>\n</html>`,
      ),
      t('How will the browser render above HTML file?'),
    ],
    options: [
      no(
        '6406533039418',
        rnd(
          'All three spans on a single line: a wide purple-bordered box with blue text on aqua, then a small aqua "SPAN", then a small yellow "SPAN".',
        ),
      ),
      no(
        '6406533039419',
        rnd('Three small shrink-to-fit boxes side by side on one line: purple-bordered blue-on-aqua, aqua, then yellow.'),
      ),
      no(
        '6406533039420',
        rnd(
          'Three stacked boxes, each spanning the same 20%-width band: purple-bordered blue-on-aqua, then aqua, then yellow stretched to the same width.',
        ),
      ),
      ok(
        '6406533039421',
        rnd(
          'Three stacked rows: a 20%-wide purple-bordered box with blue text on aqua; below it a 20%-wide aqua box with red text; below that a yellow box with red text sized only to fit the word "SPAN".',
        ),
      ),
    ],
    solution: {
      verdict:
        'The fourth option: two full 20%-wide boxes stacked, then a shrink-to-fit yellow box on its own line.',
      explanation: [
        t('Resolve each span separately. Specificity ranks id above class above element, so:'),
        tbl(
          ['Element', 'background', 'color', 'display', 'width'],
          [
            ['`<span class="class" id="id">`', 'aqua (`.class` beats `span`)', 'blue (`#id` beats `.class`)', '`inline-block` (`#id` beats `.class`)', '20% from `.class`'],
            ['`<span class="class">`', 'aqua', 'red', '`block`', '20%'],
            ['`<span>`', 'yellow', 'red', 'inline (default)', 'shrink to fit'],
          ],
        ),
        t('The first span is `inline-block`, so it is a sized box — but the second span is `block`, which forces a line break before it. The third span is a plain inline element, so it starts after the second block ends and takes only as much width as its text needs.'),
        t('That last detail is what separates the correct option from the near-miss: an inline `<span>` never stretches to a set width.'),
      ],
      approach:
        'Build the table above before you look at the pictures. Colour resolves by specificity; layout resolves by `display`.',
      takeaways: [
        '`#id` beats `.class` beats element, regardless of source order.',
        'A `block` element forces a line break before and after it, pushing the following inline content onto a new line.',
        '`width` has no effect on a plain inline element.',
      ],
    },
  },
  {
    id: 'ep6-q158',
    paperId: P,
    number: 158,
    sourceQuestionId: '640653902447',
    type: 'MCQ',
    marks: 3,
    title: 'Match calculator URLs with their rendered output (string vs int arithmetic)',
    topicId: 'flask-routing',
    subtopicId: 'request-args',
    difficulty: 'moderate',
    stem: [
      t('Consider the following flask application.'),
      py(
        `from flask import Flask, request\napp = Flask(__name__)\n@app.route('/calculate')\ndef calculate():\n    a = request.args.get('a')\n    b = request.args.get('b')\n    operator = request.args.get('operator')\n    if a and b and operator:\n        if operator == 'one':\n            return f'{a} + {b} = {a+b}'\n        elif operator == 'two':\n            return f'{a} - {b} = {int(a) - int(b)}'\n        elif operator == 'three':\n            return f'{a} x {b} = {int(a)*b}'\n    else:\n            return 'Error: Insufficient arguments'\napp.run(debug=True)`,
        'app.py',
      ),
      t('If the application is running locally on `http://127.0.0.1:5000` then match the URLs with their rendered output?'),
      tbl(
        ['URLs', 'Output'],
        [
          ['1. `http://localhost:5000/calculate?a=4&b=2&operator=two`', 'a. `4 x 2 = 8`'],
          ['2. `http://localhost:5000/calculate?a=4&b=2&operator=three`', 'b. `4 + 2 = 6`'],
          ['3. `http://localhost:5000/calculate?a=4&b=2&operator=one`', 'c. `4 - 2 = 2`'],
          ['', 'd. `4 + 2 = 42`'],
          ['', 'e. `4 x 2 = 2222`'],
        ],
      ),
    ],
    options: [
      no('6406533039422', '1-c, 2-a, 3-b'),
      no('6406533039423', '1-c, 2-a, 3-d'),
      ok('6406533039424', '1-c, 2-e, 3-d'),
      no('6406533039425', '1-c, 2-a, 3-e'),
    ],
    solution: {
      verdict: '1-c, 2-e, 3-d.',
      explanation: [
        t('`request.args.get` always returns a **string**. Everything follows from where the code converts and where it does not.'),
        tbl(
          ['operator', 'Expression', 'Evaluates to', 'Output'],
          [
            ['`two`', '`int(a) - int(b)`', '`4 - 2 = 2`', '`4 - 2 = 2` (c)'],
            ['`three`', '`int(a)*b` = `4 * "2"`', 'string repetition → `"2222"`', '`4 x 2 = 2222` (e)'],
            ['`one`', '`a+b` = `"4"+"2"`', 'concatenation → `"42"`', '`4 + 2 = 42` (d)'],
          ],
        ),
        t('`int * str` in Python repeats the string, which is why option (e) exists at all. Only the `two` branch converts both operands, so only it does real arithmetic.'),
      ],
      approach: 'Mark every operand as `str` or `int` before evaluating, then apply the operator that those types imply.',
      takeaways: [
        'Query-string values are strings until you convert them.',
        '`"4" + "2"` is `"42"`; `4 * "2"` is `"2222"`.',
      ],
    },
  },
  {
    id: 'ep6-q159',
    paperId: P,
    number: 159,
    sourceQuestionId: '640653902456',
    type: 'MCQ',
    marks: 3,
    title: 'Which view functions return 200 OK for /details/1001/Michael',
    topicId: 'flask-routing',
    subtopicId: 'routes-converters',
    difficulty: 'foundational',
    stem: [
      t('Which of the following flask view functions will return a 200 OK for the URL: `http://127.0.0.1:5000/details/1001/Michael` ?'),
    ],
    options: [
      no(
        '6406533039454',
        py(`@app.route('/details/<int:id>/<string:name>')\ndef show(id, name):\n    details = {'student_id': id, 'student_name': name}\n    return details`),
      ),
      no(
        '6406533039455',
        py(`@app.route('/details/<string:id>/<string:name>')\ndef show(id, name):\n    details = {'student_id': id, 'student_name': name}\n    return details`),
      ),
      no(
        '6406533039456',
        py(`@app.route('/details/<id>/<name>')\ndef show(id, name):\n    details = {'student_id': id, 'student_name': name}\n    return details`),
      ),
      ok('6406533039457', 'All of these'),
    ],
    solution: {
      verdict: 'All of these.',
      explanation: [
        t('The URL supplies two segments after `/details/`: `1001` and `Michael`. Each rule accepts exactly two segments, so the only question is whether the converters accept these particular values.'),
        li([
          '`<int:id>` matches `1001` because it is digits only, and passes `1001` as an `int`.',
          '`<string:id>` matches `1001` too — a string converter accepts digits; it just hands them over as `"1001"`.',
          '`<id>` with no converter is `string` by default, so it behaves like the second.',
        ]),
        t('All three views then return a dict, which Flask serialises to JSON with a 200 status. Nothing in any of them can fail for this URL.'),
      ],
      approach:
        'Ask "would this segment match?" for each converter separately. Digits are valid strings, so `int` is the *narrower* option, not a different one.',
      takeaways: [
        'A numeric segment matches `int`, `string` and the bare default alike.',
        'Returning a dict from a Flask view produces a JSON response with status 200.',
      ],
    },
  },
  {
    id: 'ep6-q160',
    paperId: P,
    number: 160,
    sourceQuestionId: '640653902457',
    type: 'MCQ',
    marks: 3,
    title: 'pytest -k Test_class on classes with mixed method names',
    topicId: 'testing',
    subtopicId: 'pytest-collection',
    difficulty: 'moderate',
    stem: [
      t('Consider a function `func`, and a set of test cases given below.'),
      py(
        `import pytest\ndef func(x,y):\n    out = x**2+y**2\n    return out\n\nclass Test_class0():\n    def test_case1(self):\n        assert func(1,2) == 5\n\n    def case_test2(self):\n        assert func(2,3) == 13\n\n    def case_test3(self):\n        assert func(6,2) == 38\n\nclass Test_class1():\n    def test_case1(self):\n        assert func(5,2) == 29\n\n    def case_test2(self):\n        assert func(1,1) == 2`,
        'test_file.py',
      ),
      t('What will be the output on the terminal for the command below?'),
      sh('pytest test_file.py -k Test_class'),
    ],
    options: [
      no('6406533039458', out('== 1 failed, 4 passed in 0.17s ===')),
      no('6406533039459', out('== 2 passed, 3 deselected in 0.17s ===')),
      ok('6406533039460', out('== 2 passed in 0.07s ===')),
      no('6406533039461', out('== 3 failed, 2 passed in 0.17s ===')),
    ],
    solution: {
      verdict: '`== 2 passed in 0.07s ===`',
      explanation: [
        t('Collection happens before selection. pytest only collects methods whose name starts with `test_`, so of the five methods here only two are tests at all:'),
        tbl(
          ['Method', 'Collected?', 'Assertion', 'Result'],
          [
            ['`Test_class0.test_case1`', 'yes', '`func(1,2) == 5` → `1+4 = 5`', 'passes'],
            ['`Test_class0.case_test2`', 'no — wrong prefix', '—', 'never runs'],
            ['`Test_class0.case_test3`', 'no — wrong prefix', '—', 'never runs'],
            ['`Test_class1.test_case1`', 'yes', '`func(5,2) == 29` → `25+4 = 29`', 'passes'],
            ['`Test_class1.case_test2`', 'no — wrong prefix', '—', 'never runs'],
          ],
        ),
        t('`-k Test_class` then filters the two collected tests by name, and both match — so nothing is deselected and the summary shows no "deselected" count at all.'),
        t('The distractor `2 passed, 3 deselected` is what you would expect if `case_test2` and `case_test3` had been collected. They never were, so they cannot be deselected either.'),
      ],
      approach:
        'Count collected tests first using the naming rules alone; only then apply `-k` or `-m`. That order eliminates most options immediately.',
      takeaways: [
        'Methods must start with `test_`; a `_test` suffix does not count.',
        '"Deselected" only ever applies to tests that were collected in the first place.',
      ],
    },
  },
  {
    id: 'ep6-q161',
    paperId: P,
    number: 161,
    sourceQuestionId: '640653902460',
    type: 'MCQ',
    marks: 3,
    title: 'Maximum HDD spin rate for a given read speed',
    topicId: 'web-fundamentals',
    subtopicId: 'storage-hardware',
    difficulty: 'foundational',
    stem: [
      t(
        'The lens of an HDD can read data on the rotating disk with the speed of 42,000 bits per second. The disk is designed such that 600 bits pass under the lens for every revolution of the disk, what should be the maximum speed of disk in RPM so that the lens does not miss any data?',
      ),
    ],
    options: [
      no('6406533039470', '70 RPM'),
      no('6406533039471', '100 RPM'),
      ok('6406533039472', '4200 RPM'),
      no('6406533039473', '6000 RPM'),
    ],
    solution: {
      verdict: '4200 RPM.',
      explanation: [
        t('The lens can absorb 42,000 bits every second, and one revolution presents 600 bits. So the fastest the disk may spin without presenting bits the lens cannot read is:'),
        out('42,000 bits/s ÷ 600 bits/revolution = 70 revolutions per second\n70 rev/s × 60 s/min = 4200 RPM'),
        t('`70` appears as a distractor precisely because it is the answer in revolutions per **second**. The question asks for RPM, so the ×60 is the whole difficulty.'),
      ],
      approach: 'Get to revolutions per second first, then convert. Write the unit on every line.',
      takeaways: ['RPM = (bits per second ÷ bits per revolution) × 60.'],
    },
  },
  {
    id: 'ep6-q162',
    paperId: P,
    number: 162,
    sourceQuestionId: '640653902463',
    type: 'MCQ',
    marks: 3,
    title: 'pytest with a fixture that calls a live Flask route',
    topicId: 'testing',
    subtopicId: 'fixtures',
    difficulty: 'moderate',
    stem: [
      t('Consider the below two python files code snippets *app.py* and *test_app_route.py*.'),
      py(
        `from flask import Flask\napp = Flask(__name__)\n\n@app.route("/greet/<string:name>")\ndef home(name):\n   return "Hello, " + name\n\nif __name__ == "__main__":\n   app.run()`,
        'app.py',
      ),
      py(
        `import pytest, requests\n\n@pytest.fixture\ndef get_response():\n   resp = requests.get("http://127.0.0.1:5000/greet/IITM")\n   return resp\n\ndef test_response(get_response):\n   assert get_response.text == "Hello, IITM"`,
        'test_app_route.py',
      ),
      t(
        'Assume that *app.py* and *test_app_route.py* are running on two different terminals. And also all required modules are installed. Which of the below statement(s) are True?',
      ),
      li(
        [
          'i) Executing the command **pytest test_app_route.py** on the terminal returns `=========== 1 passed ============`',
          'ii) Executing the command **pytest test_app_route.py** on the terminal returns `============ 1 failed ==============`',
          'iii) Executing the command **pytest test_app_route.py** on the terminal returns `=========== 1 selected, 1 passed =============`',
          'iv) Executing the command **pytest test_app_route.py** on the terminal returns `============ 1 deselected ==============`',
        ],
        false,
      ),
    ],
    options: [
      ok('6406533039482', 'Only statement i is correct'),
      no('6406533039483', 'Only statement ii is correct'),
      no('6406533039484', 'Statements i and iii are correct'),
      no('6406533039485', 'Statements ii and iv are correct'),
    ],
    solution: {
      verdict: 'Only statement i is correct.',
      explanation: [
        t('The server is running in a separate terminal, so the fixture\'s real HTTP request succeeds. `/greet/IITM` returns the string `Hello, IITM`, which is exactly what the assertion compares against — the test passes.'),
        t('That leaves the two statements that describe pytest\'s *output format* rather than the result:'),
        li([
          '**iii** — pytest never prints "selected" in a summary line. It prints "deselected" when a filter removed tests, and says nothing about selection otherwise.',
          '**iv** — "deselected" requires a `-k` or `-m` filter. The command has neither, so nothing can be deselected.',
        ]),
        t('So only statement i describes both a correct result and a real pytest summary.'),
      ],
      approach:
        'Separate "did the test pass?" from "is that a real pytest output line?". Options here fail on the second question as often as the first.',
      takeaways: [
        'A fixture that makes a real HTTP request needs a genuinely running server.',
        'pytest reports "deselected", never "selected".',
      ],
    },
  },
  {
    id: 'ep6-q163',
    paperId: P,
    number: 163,
    sourceQuestionId: '640653902465',
    type: 'MCQ',
    marks: 3,
    title: 'reqparse vs request.args vs path variable in one flask_restful POST',
    topicId: 'rest-apis',
    subtopicId: 'reqparse-json',
    difficulty: 'demanding',
    stem: [
      t('Consider the following flask resource created using `flask_restful`.'),
      py(
        `from flask import Flask, request\nfrom flask_restful import Api, Resource, reqparse\n\napp = Flask(__name__)\napi = Api(app)\n\nparser = reqparse.RequestParser()\nparser.add_argument("val")\n\nclass RestApi(Resource):\n    def post(self, val):\n        arg1 = parser.parse_args()\n        arg2 = request.args\n        return {\n                "Course_1": arg1["val"],\n                "Course_2": arg2["val"],\n                "Course_3": val\n            }\n\napi.add_resource(RestApi, "/api/courses/<val>")\napp.run(debug = True)`,
      ),
      t('If the application is running locally on `http://127.0.0.1:5000`, What will be the output on the terminal for the command:'),
      sh(`curl http://127.0.0.1:5000/api/courses/DBMS?val=JAVA -d\n "{\\"val\\":\\"PDSA\\"}" -X POST -H "Content-Type: application/json"`),
    ],
    options: [
      no('6406533039490', c('json', `{\n    "Course_1": "JAVA",\n    "Course_2": "PDSA",\n    "Course_3": "DBMS"\n}`)),
      no('6406533039491', c('json', `{\n    "Course_1": "DBMS",\n    "Course_2": "JAVA",\n    "Course_3": "PDSA"\n}`)),
      ok('6406533039492', c('json', `{\n    "Course_1": "PDSA",\n    "Course_2": "JAVA",\n    "Course_3": "DBMS"\n}`)),
      no('6406533039493', c('json', `{\n    "Course_1": "PDSA",\n    "Course_2": "DBMS",\n    "Course_3": "JAVA"\n}`)),
    ],
    solution: {
      verdict: 'Course_1 = PDSA, Course_2 = JAVA, Course_3 = DBMS.',
      explanation: [
        t('One request carries the name `val` three separate times, and the code reads it through three different channels. Keep them apart:'),
        tbl(
          ['Where the value comes from', 'Read by', 'Value'],
          [
            ['JSON body `{"val":"PDSA"}`', '`parser.parse_args()` → `arg1["val"]`', '`PDSA`'],
            ['Query string `?val=JAVA`', '`request.args` → `arg2["val"]`', '`JAVA`'],
            ['Path variable `/api/courses/DBMS`', 'the `val` parameter of `post`', '`DBMS`'],
          ],
        ),
        t('`reqparse` looks in several locations for an argument, and with `Content-Type: application/json` set the JSON body takes precedence over the query string — so `arg1["val"]` is `PDSA`, not `JAVA`. `request.args` only ever looks at the query string, so it is unambiguously `JAVA`. The path variable is bound by the routing rule and is unaffected by either.'),
      ],
      approach:
        'Label each occurrence of the key with its channel before reading the return statement. The three channels never interfere with each other.',
      takeaways: [
        '`reqparse` prefers the JSON body over the query string for the same argument name.',
        '`request.args` reads the query string only.',
        'A path variable is bound by the route rule and is independent of both.',
      ],
    },
  },
  {
    id: 'ep6-q164',
    paperId: P,
    number: 164,
    sourceQuestionId: '640653902469',
    type: 'MCQ',
    marks: 3,
    title: 'Sequence of status codes across login, home and logout',
    topicId: 'flask-routing',
    subtopicId: 'sessions',
    difficulty: 'demanding',
    stem: [
      t('A flask application shown below is running locally on `http://127.0.0.1:5000`.'),
      py(
        `from flask import Flask, request, session, abort\n\napp = Flask(__name__)\napp.config['SECRET_KEY'] = "yekterces"\n\n@app.route('/login')\ndef log_in():\n    user = request.args['user']\n    role = request.args['role'] if 'role' in request.args else 'general'\n    session['user'], session['role'] = user, role\n    return "Logged in successfully!"\n\n@app.route('/home')\ndef land():\n    if 'user' in session:\n        if session['role'] == 'admin':\n            return f"Welcome {session['user']}"\n        return abort(401)\n    return abort(404)\n\n@app.route('/logout')\ndef log_out():\n    session.pop('user', None)\n    session.pop('role', None)\n    return "Logged out sucessfully!"\n\napp.run(debug=True)`,
      ),
      t(
        'If the application is running locally on `http://127.0.0.1:5000`, What will be the correct sequence of response status codes if the client visits the URLs one by one in the sequence given below?',
      ),
      li(
        [
          '`http://127.0.0.1:5000/home`',
          '`http://127.0.0.1:5000/login/admin`',
          '`http://127.0.0.1:5000/login?user=admin`',
          '`http://127.0.0.1:5000/home`',
          '`http://127.0.0.1:5000/logout`',
        ],
        true,
      ),
    ],
    options: [
      no('6406533039506', out('401\n401\n200\n404\n200')),
      no('6406533039507', out('404\n200\n200\n200\n200')),
      ok('6406533039508', out('404\n404\n200\n401\n200')),
      no('6406533039509', out('404\n200\n404\n200\n200')),
    ],
    solution: {
      verdict: '404, 404, 200, 401, 200.',
      explanation: [
        t('The session carries state forward, so the requests must be walked in order.'),
        tbl(
          ['#', 'URL', 'What happens', 'Status'],
          [
            ['1', '`/home`', 'Session is empty, so `\'user\' in session` is false → `abort(404)`', '**404**'],
            ['2', '`/login/admin`', 'The rule is `/login`, with no variable part — this URL matches no route at all', '**404**'],
            ['3', '`/login?user=admin`', "`user='admin'`; `role` is absent so it defaults to `'general'`; both stored in the session", '**200**'],
            ['4', '`/home`', "`'user'` is now in the session, but `role` is `'general'`, not `'admin'` → `abort(401)`", '**401**'],
            ['5', '`/logout`', 'Both keys popped, returns a string', '**200**'],
          ],
        ),
        t('Request 2 is the one that catches people: `/login/admin` *looks* like it is passing a role, but there is no `<...>` in the rule, so Flask has nothing to match it against. And request 4 is 401 rather than 200 because the login in step 3 supplied no `role` query parameter — the default `general` is not `admin`.'),
      ],
      approach:
        'Draw a two-column table of "session contents" and "status" and update it after every request. Never evaluate a later request against the initial state.',
      takeaways: [
        'A URL with an extra path segment does not match a rule that has no variable part.',
        'Session state set by one request changes the outcome of the next.',
        '401 means authenticated-but-not-permitted here; 404 is the unauthenticated case this code chose.',
      ],
    },
  },
  {
    id: 'ep6-q165',
    paperId: P,
    number: 165,
    sourceQuestionId: '640653902470',
    type: 'MCQ',
    marks: 3,
    title: 'Jinja if/else branch selected by a dictionary lookup',
    topicId: 'jinja-templates',
    subtopicId: 'macros-filters',
    difficulty: 'moderate',
    stem: [
      t('Consider the following flask application.'),
      py(
        `from flask import Flask, render_template, request\n\napp = Flask(__name__)\n\nemp = {'admin':'manoj', 'user':'sumit'}\n\n@app.route('/profile/<user>')\ndef profile(user):\n    access = request.args.get('access')\n    if emp[access] != user:\n        return render_template("profile.html", user = user,\n                               access = access, error = True)\n    return render_template("profile.html", user = user,\n                           access = access, error = False)\n\napp.run()`,
        'Python file: app.py',
      ),
      c(
        'jinja',
        `<body>\n    <div>\n        {% if error %}\n            <h3>Hi {{user}}, {{access}} access denied</h3>\n        {% else %}\n            <h3>Hi {{user}}, you are logged in as {{access}}.</h3>\n        {% endif %}\n    </div>\n</body>`,
        'Template file: profile.html',
      ),
      t(
        'If the application is running locally on `http://127.0.0.1:5000`, then what will be rendered by the browser for URL, `http://127.0.0.1:5000/profile/sumit?access=admin` ?',
      ),
    ],
    options: [
      no('6406533039510', 'Hi sumit, you are logged in as admin.'),
      no('6406533039511', 'Hi sumit, you are logged in as user.'),
      ok('6406533039512', 'Hi sumit, admin access denied.'),
      no('6406533039513', 'Hi sumit, user access denied.'),
    ],
    solution: {
      verdict: 'Hi sumit, admin access denied.',
      explanation: [
        t('Walk the two values through the view:'),
        li([
          '`user` comes from the path: `sumit`.',
          '`access` comes from the query string: `admin`.',
          '`emp[access]` is `emp[\'admin\']`, which is `manoj`.',
          '`manoj != sumit` is true, so `error=True` is passed to the template.',
        ]),
        t('The `{% if error %}` branch therefore renders, substituting `user` and `access` as they were passed: **Hi sumit, admin access denied.**'),
        t('The two "logged in" options require `error` to be false, which would need the URL `/profile/manoj?access=admin`. The fourth option substitutes `user` where the template writes `access`.'),
      ],
      approach:
        'Resolve every template variable to a concrete value in the view first; only then pick the branch and fill the sentence in.',
      takeaways: [
        'The dictionary is keyed by *role*, so `emp[access]` yields the name allowed to hold that role.',
        'Both branches print the same two variables — read which one goes where.',
      ],
    },
  },
  {
    id: 'ep6-q166',
    paperId: P,
    number: 166,
    sourceQuestionId: '640653902473',
    type: 'MCQ',
    marks: 3,
    title: 'Relationship between Library and Book from their model schemas',
    topicId: 'databases',
    subtopicId: 'relationships',
    difficulty: 'foundational',
    stem: [
      t('Consider the following models `Library` and `Book` corresponding to tables `library` and `book` in SQLite database.'),
      py(
        `class Library(db.Model):\n    id = db.Column(db.Integer(), primary_key = True)\n    name = db.Column(db.String(), unique = True)\n\nclass Book(db.Model):\n    id = db.Column(db.Integer(), primary_key = True)\n    name = db.Column(db.String(), unique = True)\n    library = db.Column(db.Integer(), db.ForeignKey("library.id"))`,
      ),
      t('Based on the model schemas, what relationship do the classes `Library` and `Book` share?'),
    ],
    options: [
      no('6406533039523', 'Many-to-Many'),
      ok('6406533039524', 'One-to-Many'),
      no('6406533039525', 'One-to-One'),
      no('6406533039526', 'The tables are not at all related'),
    ],
    solution: {
      verdict: 'One-to-Many.',
      explanation: [
        t('`Book.library` is a foreign key pointing at `library.id`, so each book belongs to exactly one library. Nothing stops two different books from carrying the same `library` value, so one library can hold many books: **one library to many books**.'),
        t('The two things that would change this answer:'),
        li([
          'If `library` were declared `unique=True`, no two books could share a library and the relationship would be **one-to-one**.',
          'If there were an association table holding pairs of ids, it would be **many-to-many**.',
        ]),
        t('Note that `name` is `unique=True` on both models — that constrains book titles and library names, and has nothing to do with the relationship.'),
      ],
      approach: 'Find the ForeignKey, check the table it points at, then check whether that column is unique. Ignore every other `unique=True`.',
      takeaways: [
        'The table holding the foreign key is the "many" side.',
        '`unique=True` on the foreign-key column is what makes a relationship one-to-one.',
      ],
    },
  },
  {
    id: 'ep6-q167',
    paperId: P,
    number: 167,
    sourceQuestionId: '640653902476',
    type: 'MCQ',
    marks: 3,
    title: 'Does source order or specificity decide between an id and a class?',
    topicId: 'html-css',
    subtopicId: 'css-specificity',
    difficulty: 'moderate',
    stem: [
      t('Read the statements given below carefully and select the correct option.'),
      t(
        '**Statement 1:** If an element having an ID and a class is styled externally using both its ID and the class, then for the same attribute, it will acquire styling from the latest selector in order.',
      ),
      t(
        '**Statement 2:** If an element that belongs to two different classes is styled externally using both the classes, then for the same attribute, it will acquire styling from the latest class in order.',
      ),
    ],
    options: [
      no('6406533039535', 'Both statements 1 and 2 are correct'),
      no('6406533039536', 'Both statements 1 and 2 are incorrect'),
      no('6406533039537', 'Statement 1 is correct but statement 2 is incorrect'),
      ok('6406533039538', 'Statement 2 is correct but statement 1 is incorrect'),
    ],
    solution: {
      verdict: 'Statement 2 is correct but statement 1 is incorrect.',
      explanation: [
        t('The cascade resolves specificity **before** source order, and the two statements sit on opposite sides of that rule.'),
        c(
          'css',
          `/* Statement 1: id vs class - specificity decides */\n.box { color: red; }\n#box { color: blue; }\n/* ... and swapping these two lines changes nothing: the id always wins */\n\n/* Statement 2: class vs class - specificity ties, so order decides */\n.a { color: green; }\n.b { color: purple; }   /* this one wins */`,
        ),
        t('So Statement 1 is wrong: an id selector beats a class selector whichever is written last. Statement 2 is right: two class selectors have equal specificity, so the later declaration wins.'),
      ],
      approach:
        'Ask first whether the two selectors have the same specificity. Only if they do does "later wins" apply.',
      takeaways: [
        'Specificity: inline > id > class > element.',
        'Source order is a tie-breaker, not a rule of its own.',
      ],
    },
  },
  {
    id: 'ep6-q168',
    paperId: P,
    number: 168,
    sourceQuestionId: '640653902459',
    type: 'MCQ',
    marks: 4.5,
    title: 'Terminal output of a logging script run with a negative argument',
    topicId: 'python-cli',
    subtopicId: 'logging',
    difficulty: 'demanding',
    stem: [
      t('Consider the following Python code snippet.'),
      py(
        `import logging\nimport sys\n\nlogging.basicConfig(level=logging.WARNING,\n                    format='%(asctime)s - %(levelname)s - %(message)s')\n\ndef check_val(value):\n    if value < 0:\n        raise ValueError("Invalid value: Please enter a positive value.")\n    else:\n        logging.info("Value added: %s", value)\n\ntry:\n    input_value = -int(sys.argv[1])\n    check_val(input_value)\nexcept ValueError as ve:\n    logging.exception("Exception occurred: %s", str(ve))`,
        'log.py',
      ),
      t('What will be the output on the terminal for the command: `python log.py -12` ?'),
    ],
    options: [
      no('6406533039466', out('2023-08-14 21:01:05,684 - INFO - Value added: 12')),
      no('6406533039467', out('2023-08-14 21:01:05,684 - WARNING - Value added: -12')),
      no('6406533039468', out('Error: Exception occurred: Invalid value: Please enter a positive value.')),
      ok('6406533039469', 'None of these'),
    ],
    solution: {
      verdict: 'None of these — the script prints nothing at all.',
      explanation: [
        t('Two independent details combine here, and missing either one leads to a plausible-looking wrong answer.'),
        li(
          [
            "**The minus sign is applied twice.** `sys.argv[1]` is the string `'-12'`, so `int(sys.argv[1])` is `-12`, and the leading `-` in `-int(...)` negates it again. `input_value` is `+12`.",
            '**`check_val(12)` takes the `else` branch**, because `12 < 0` is false. No exception is raised, so the `except` block never runs.',
            "**The `else` branch logs at INFO**, but `basicConfig` set the threshold to `WARNING`. INFO is below WARNING, so the record is discarded before it reaches the console.",
          ],
          true,
        ),
        t('Nothing is printed. Each distractor fixes one step and gets the others wrong: the first forgets the level threshold, the second invents a WARNING level, the third assumes the exception path was taken.'),
      ],
      approach:
        'For any logging question, check the configured level before reading a single log call — it decides whether the call produces output at all.',
      takeaways: [
        'DEBUG < INFO < WARNING < ERROR < CRITICAL; calls below the configured level are silently dropped.',
        '`-int("-12")` is `12`. Read the sign in the code *and* the sign in the argument.',
        '"None of these" is a real answer when a script is correctly silent.',
      ],
    },
  },
  {
    id: 'ep6-q169',
    paperId: P,
    number: 169,
    sourceQuestionId: '640653902462',
    type: 'MCQ',
    marks: 4.5,
    title: 'Total data consumed by three users from a 24-hour bandwidth graph',
    topicId: 'web-fundamentals',
    subtopicId: 'bandwidth-latency',
    difficulty: 'demanding',
    stem: [
      t(
        'Consider the following graph that represents the variation in bandwidth of a network for an entire day (24 hours). Three users were connected to the network at three different times of the day. What is the total data consumed in GigaBytes by all the users in 24 hrs?',
      ),
      fig(
        '/figures/bandwidth-24h-a.png',
        'Step graph of bandwidth in Megabits per second against time in hours over 24 hours, with bars marking the connection windows of user 1, user 2 and user 3.',
        'Reproduced from the source paper.',
      ),
    ],
    options: [
      no('6406533039478', '633.6 GB'),
      ok('6406533039479', '54 GB'),
      no('6406533039480', '120 GB'),
      no('6406533039481', '432 GB'),
    ],
    solution: {
      verdict: '54 GB.',
      explanation: [
        t('Only the intervals during which a user is actually connected count. The bars across the top of the graph give those windows: user 1 from 0–4 h, user 2 from 8–14 h, user 3 from 16–24 h. The bandwidth trace supplies the rate within each window.'),
        tbl(
          ['User', 'Window', 'Rate', 'Duration', 'Data'],
          [
            ['User 1', '0–4 h', '8 Mb/s', '4 h', '32 Mb·h'],
            ['User 2', '8–12 h', '6 Mb/s', '4 h', '24 Mb·h'],
            ['User 2', '12–14 h', '8 Mb/s', '2 h', '16 Mb·h'],
            ['User 3', '16–20 h', '2 Mb/s', '4 h', '8 Mb·h'],
            ['User 3', '20–24 h', '10 Mb/s', '4 h', '40 Mb·h'],
            ['', '', '', '**Total**', '**120 Mb·h**'],
          ],
        ),
        out(
          '120 Mb·h × 3600 s/h = 432,000 Megabits\n432,000 Mb ÷ 8       = 54,000 Megabytes\n54,000 MB ÷ 1000     = 54 GB',
        ),
        t('The distractors are the same calculation stopped early or in the wrong unit: **432 GB** is the total in *megabits* mislabelled, **120 GB** is the raw Mb·h figure, and **633.6 GB** is what you get by integrating the whole 24 hours instead of only the three connection windows.'),
      ],
      approach:
        'Tabulate window, rate and duration before multiplying anything. Do the bit→byte division once, at the very end.',
      takeaways: [
        'Data = area under the bandwidth curve, but only over the intervals the question asks about.',
        'Megabits to Megabytes is ÷8. Every wrong option here is a unit error.',
      ],
    },
  },
  {
    id: 'ep6-q170',
    paperId: P,
    number: 170,
    sourceQuestionId: '640653902466',
    type: 'MCQ',
    marks: 4.5,
    title: 'What a query returns when the last object was added but never committed',
    topicId: 'databases',
    subtopicId: 'session',
    difficulty: 'demanding',
    stem: [
      t('Consider the below flask application.'),
      py(
        `from flask_sqlalchemy import SQLAlchemy\nfrom flask import Flask\n\napp = Flask (__name__)\napp.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///testdb.sqlite3'\ndb = SQLAlchemy(app)\napp.app_context().push()\n\nclass Material(db.Model):\n   m_id = db.Column('m_id', db.Integer, primary_key = True)\n   name = db.Column('name', db.String(100), unique = True)\n\ndb.create_all()\nmaterial1 = Material(name = 'Steel')\ndb.session.add(material1)\nmaterial2 = Material(name = 'Iron')\nmaterial3 = Material(name = 'Aluminium')\ndb.session.add(material2)\ndb.session.commit()\ndb.session.add(material3)\n\nall_material = Material.query.all()\nprint([(x.m_id, x.name) for x in all_material])`,
      ),
      t('If you run the flask application using a terminal. What will be the output in the terminal?'),
    ],
    options: [
      no(
        '6406533039494',
        "`[(1, 'Steel'), (2, 'Iron')]` will be displayed in the terminal and two records will be added in the “testdb” database.",
      ),
      no(
        '6406533039495',
        "`[(1, 'Steel'), (2, 'Iron'), (3, 'Aluminium')]` will be displayed in the terminal and three records will be added in the “testdb” database.",
      ),
      ok(
        '6406533039496',
        "`[(1, 'Steel'), (2, 'Iron'), (3, 'Aluminium')]` will be displayed in the terminal and two records will be added in the “testdb” database.",
      ),
      no(
        '6406533039497',
        "`[(1, 'Steel', 2 , 'Iron', 3 , 'Aluminium')]` will be displayed in the terminal and two records will be added in the “testdb” database.",
      ),
    ],
    solution: {
      verdict: 'All three tuples are printed, but only two rows reach the database file.',
      explanation: [
        t('Split the script at the single `commit()`:'),
        li([
          '`material1` and `material2` are added **before** the commit, so both are written to `testdb.sqlite3` — **two persisted rows**.',
          '`material3` is added **after** the commit and never committed, so nothing about it reaches the file.',
        ]),
        t('The print is a different matter. `Material.query.all()` runs inside the same session, and SQLAlchemy **autoflushes** pending objects before executing a query so the query sees a consistent picture of the session. `material3` is therefore flushed to the transaction, receives `m_id = 3`, and comes back in the result — even though the transaction is never committed.'),
        t('So the terminal shows all three, and the database keeps two. The last option is a different shape entirely: the comprehension builds a list of tuples, not one flat tuple.'),
      ],
      approach:
        'Answer "what is printed?" and "what is stored?" as two separate questions. They diverge exactly at the last `commit()`.',
      takeaways: [
        'Only work staged before a `commit()` is persisted.',
        'A query in the same session can still see uncommitted objects, because SQLAlchemy flushes before querying.',
      ],
    },
  },
  {
    id: 'ep6-q171',
    paperId: P,
    number: 171,
    sourceQuestionId: '640653902472',
    type: 'MCQ',
    marks: 4.5,
    title: 'Round-trip latency across a cable segment and an air segment',
    topicId: 'web-fundamentals',
    subtopicId: 'bandwidth-latency',
    difficulty: 'demanding',
    stem: [
      t(
        'A client machine C is 18000 kms away from the server machine S. A router R is situated somewhere in between the client C and the server S and is connected to client C with cable and makes aerial connection with the server S. What will be the round-trip latency (milliseconds) of the network if the router is placed at exactly midway from the client and the server? [Assume: The speed of light on cable is 1.5 × 10⁸ m/s and in air is 3 × 10⁸ m/s. The client, server and the router lie on a straight line]',
      ),
    ],
    options: [
      no('6406533039519', '45'),
      no('6406533039520', '90'),
      ok('6406533039521', '180'),
      no('6406533039522', '270'),
    ],
    solution: {
      verdict: '180 ms.',
      explanation: [
        t('The router sits midway, so each leg is 9000 km = 9 × 10⁶ m, and each leg uses a different medium. Compute them separately:'),
        out(
          'C → R  (cable):  9 × 10⁶ m ÷ 1.5 × 10⁸ m/s = 0.06 s\nR → S  (air):    9 × 10⁶ m ÷ 3.0 × 10⁸ m/s = 0.03 s\n\none way          = 0.06 + 0.03 = 0.09 s   = 90 ms\nround trip       = 2 × 90 ms              = 180 ms',
        ),
        t('The two distractors are the two ways to stop early: **90** is the one-way time, and **45** is a single leg doubled. **270** comes from using the slower cable speed for both legs.'),
      ],
      approach:
        'Never average the two propagation speeds. Compute each segment with its own speed, add, then double for the round trip.',
      takeaways: [
        'Round-trip time is twice the one-way time.',
        'Different media have different propagation speeds — split the path at the medium change.',
      ],
    },
  },
  {
    id: 'ep6-q172',
    paperId: P,
    number: 172,
    sourceQuestionId: '640653902454',
    type: 'MCQ',
    marks: 2,
    title: 'Jinja macro with a length filter inside the loop',
    topicId: 'jinja-templates',
    subtopicId: 'macros-filters',
    difficulty: 'moderate',
    stem: [
      t('Consider the following flask app and Jinja2 template.'),
      py(
        `from flask import Flask, render_template\napp = Flask(__name__)\n\n@app.route('/')\ndef index():\n  return render_template("index.html", data=['Harry', 'Karl', 'John', 'Jason', 'Ros'])\n\napp.run()`,
        'app.py',
      ),
      c(
        'jinja',
        `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <title>Macro</title>\n</head>\n<body>\n    {% macro unordered_list(items)%}\n        <ul>\n        {% for item in items %}\n            {% if item|length >= 5 %}\n            <li>{{item}}</li>\n            {% endif %}\n        {% endfor %}\n        </ul>\n    {% endmacro %}\n    {{ unordered_list(data) }}\n</body>\n</html>`,
        'index.html',
      ),
      t('If the flask app is running locally on `http://127.0.0.1:5000`. What will be the output on the browser for the base URL?'),
    ],
    options: [
      no('6406533039446', rnd('A bulleted list of all five names: Harry, Karl, John, Jason, Ros.')),
      no('6406533039447', rnd('A bulleted list of two names: Karl, John.')),
      ok('6406533039448', rnd('A bulleted list of two names: Harry, Jason.')),
      no('6406533039449', rnd('A bulleted list of three names: Karl, John, Ros.')),
    ],
    solution: {
      verdict: 'Harry and Jason.',
      explanation: [
        t('The macro loops over every item but the `{% if %}` only emits an `<li>` for names of length 5 or more. Applying `|length` to each string:'),
        tbl(
          ['Name', 'Length', '`>= 5`?', 'Rendered'],
          [
            ['Harry', '5', 'yes', 'yes'],
            ['Karl', '4', 'no', 'no'],
            ['John', '4', 'no', 'no'],
            ['Jason', '5', 'yes', 'yes'],
            ['Ros', '3', 'no', 'no'],
          ],
        ),
        t('So the list has exactly two items, in source order: **Harry, Jason**. The `>=` is what makes the five-letter names qualify — with a plain `>` the list would be empty.'),
      ],
      approach: 'Evaluate the filter against every item and tick or cross it before looking at the options.',
      takeaways: [
        '`|length` on a string gives its character count.',
        'A macro renders once per call; the loop and condition inside it still run per item.',
      ],
    },
  },
  {
    id: 'ep6-q173',
    paperId: P,
    number: 173,
    sourceQuestionId: '640653902455',
    type: 'MCQ',
    marks: 2,
    title: 'Match types of testing with their functionality',
    topicId: 'testing',
    subtopicId: 'testing-levels',
    difficulty: 'foundational',
    stem: [
      t('Match the following types of testing with their functionality.'),
      tbl(
        ['Type of testing', 'Functionality'],
        [
          ['A. Regression testing', '1. Beta Testing'],
          ['B. User Acceptance testing', '2. one step beyond integration testing, includes server and environment'],
          ['C. System Testing', '3. Simulates actual user interaction, allows to script browser'],
          ['D. System testing Automation', '4. Type of testing that runs after every change to ensure that the change introduces no unintended breaks.'],
        ],
      ),
      t('Which of the following is the correct matching?'),
    ],
    options: [
      no('6406533039450', 'A → 1, B → 2, C → 3, D → 4'),
      no('6406533039451', 'A → 4, B → 3, C → 2, D → 1'),
      ok('6406533039452', 'A → 4, B → 1, C → 2, D → 3'),
      no('6406533039453', 'A → 3, B → 2, C → 1, D → 4'),
    ],
    solution: {
      verdict: 'A → 4, B → 1, C → 2, D → 3.',
      explanation: [
        tbl(
          ['Type', 'Matches', 'Why'],
          [
            ['Regression testing', '4', 'Re-run after every change specifically to catch breaks the change introduced.'],
            ['User Acceptance testing', '1', 'Real users validating the product before release — that is what beta testing is.'],
            ['System Testing', '2', 'The whole application in a full environment: one step past integration.'],
            ['System testing Automation', '3', 'Scripting a browser to simulate a real user\'s interaction.'],
          ],
        ),
        t('The pair that decides the question is B and D. "Beta testing" is a form of acceptance testing done by users, while "scripting the browser" is by definition automation — so B → 1 and D → 3, which only one option gets right.'),
      ],
      approach:
        'Anchor on the two descriptions you are sure of — "runs after every change" and "scripts the browser" — and let them eliminate options.',
      takeaways: [
        'Beta testing is user acceptance testing.',
        'System testing is integration testing plus the real environment.',
      ],
    },
  },
  {
    id: 'ep6-q174',
    paperId: P,
    number: 174,
    sourceQuestionId: '640653902458',
    type: 'MCQ',
    marks: 2,
    title: 'Rendered output of a child template extending a base template',
    topicId: 'jinja-templates',
    subtopicId: 'inheritance',
    difficulty: 'moderate',
    stem: [
      t('Consider the following python code snippet app.py, the HTML files, base.html and home.html residing in “templates” folder.'),
      py(
        `from flask import Flask, render_template\napp = Flask(__name__)\n@app.route('/')\ndef home():\n     return render_template('home.html')\napp.run(debug=True)`,
        'app.py',
      ),
      c(
        'jinja',
        `{% extends "base.html" %}\n{% block content %}\n<p>MAD I</p>\n<span>MAD II</span>\n<p>DBMS</p>\n{% endblock %}`,
        'home.html',
      ),
      c(
        'jinja',
        `<!DOCTYPE html>\n<html lang="en">\n<head>\n     <title>IITM</title>\n</head>\n<body>\n     <h2 style="color: violet;"> Diploma Courses </h2>\n     {% block content %}\n     {% endblock %}\n</body>\n</html>`,
        'base.html',
      ),
      t('What will be the rendered output for base URL if flask app is running locally on `http://localhost:5000` ?'),
    ],
    options: [
      no('6406533039462', rnd('Three lines with no heading: MAD I, MAD II, DBMS.')),
      ok(
        '6406533039463',
        rnd('The violet heading "Diploma Courses", then MAD I, MAD II and DBMS each on its own line beneath it.'),
      ),
      no('6406533039464', rnd('The violet heading "Diploma Courses", then MAD I on one line and "MAD II DBMS" together on the next.')),
      no('6406533039465', rnd('No heading: MAD I on one line and "MAD II DBMS" together on the next.')),
    ],
    solution: {
      verdict: 'The violet "Diploma Courses" heading, followed by MAD I, MAD II and DBMS on separate lines.',
      explanation: [
        t('Two things have to be right at once here — inheritance and the display model — and the four options cover every combination of getting them wrong.'),
        li([
          '**The heading appears.** `home.html` extends `base.html`, so the base renders and its `<h2>` is part of the output. The block content is inserted where the base declares the block, i.e. *below* the heading.',
          '**All three lines are separate.** `<p>` is block-level, so MAD I and DBMS each occupy a line. `<span>` is inline — but it is sandwiched between two block elements, and each of those forces a line break, so MAD II ends up alone on its own line anyway.',
        ]),
        t('The options that join "MAD II DBMS" would be right if the surrounding elements were also inline; the options with no heading would be right if `home.html` did not extend anything.'),
      ],
      approach:
        'Render the base first, then drop the block content into place, then apply block/inline rules to what you have.',
      takeaways: [
        'A child template adds to the parent; the parent\'s own markup still renders.',
        'An inline element between two block elements still ends up on its own line.',
      ],
    },
  },
  {
    id: 'ep6-q175',
    paperId: P,
    number: 175,
    sourceQuestionId: '640653902464',
    type: 'MCQ',
    marks: 2,
    title: 'Maximum bandwidth of a 64-bit DDR DRAM module at 2 GHz',
    topicId: 'web-fundamentals',
    subtopicId: 'storage-hardware',
    difficulty: 'foundational',
    stem: [
      t(
        'You have a DRAM module with bus width of 64 bits, clock speed of 2 GHz, and operating in DDR (double-data-rate or two values per clock cycle) mode. What is the maximum bandwidth (in Giga-bytes per second) of data transfer achievable with this module?',
      ),
    ],
    options: [
      no('6406533039486', '16'),
      no('6406533039487', '8'),
      ok('6406533039488', '32'),
      no('6406533039489', '128'),
    ],
    solution: {
      verdict: '32 GB/s.',
      explanation: [
        t('Bandwidth is bus width × clock rate × transfers per cycle. Convert the bus width to bytes first, because the answer is asked for in gigabytes:'),
        out('bus width   = 64 bits = 8 bytes\ntransfers   = 2 per clock cycle (DDR)\nbandwidth   = 8 bytes × 2 × 10⁹ cycles/s × 2 = 32 × 10⁹ bytes/s = 32 GB/s'),
        t('The distractors are the three natural slips: **16** forgets DDR, **128** leaves the width in bits, and **8** is the bus width itself.'),
      ],
      approach: 'Convert to bytes before multiplying, and check whether the mode doubles the transfer count.',
      takeaways: ['64-bit bus = 8 bytes.', 'DDR moves two values per clock cycle.'],
    },
  },
  {
    id: 'ep6-q176',
    paperId: P,
    number: 176,
    sourceQuestionId: '640653902467',
    type: 'MCQ',
    marks: 2,
    title: 'Hexadecimal equivalent of the IPv4 address 172.16.254.10',
    topicId: 'web-fundamentals',
    subtopicId: 'addressing',
    difficulty: 'foundational',
    stem: [t('The hexadecimal equivalent of the IPv4 address `172.16.254.10` would be ____________.')],
    options: [
      no('6406533039498', 'AC0A FE01'),
      no('6406533039499', 'CA10 EF0A'),
      no('6406533039500', 'AC01 0AEF'),
      ok('6406533039501', 'AC10 FE0A'),
    ],
    solution: {
      verdict: 'AC10 FE0A.',
      explanation: [
        t('Convert each octet independently to two hex digits and concatenate in order:'),
        tbl(
          ['Octet', 'Decimal', 'Hex'],
          [
            ['1st', '172', '`AC`  (10×16 + 12)'],
            ['2nd', '16', '`10`'],
            ['3rd', '254', '`FE`  (15×16 + 14)'],
            ['4th', '10', '`0A`'],
          ],
        ),
        t('Reading them in order gives `AC 10 FE 0A`, conventionally grouped as **AC10 FE0A**. Every wrong option keeps the right digits but reorders or reverses a pair, so check the sequence octet by octet rather than recognising the digits.'),
      ],
      approach: 'Convert the four octets in a column, then read down. Never convert the address as one number.',
      takeaways: ['Each octet maps to exactly two hex digits — pad single digits with a leading zero (10 → `0A`).'],
    },
  },
  {
    id: 'ep6-q177',
    paperId: P,
    number: 177,
    sourceQuestionId: '640653902475',
    type: 'MCQ',
    marks: 2,
    title: 'What "stateless" means in the client-server model',
    topicId: 'rest-apis',
    subtopicId: 'rest-principles',
    difficulty: 'foundational',
    stem: [t('Which of the following is true about the term “stateless” in the client-server model?')],
    options: [
      no('6406533039531', 'The server keeps the state of the client to respond to the required request.'),
      no('6406533039532', "Server use variant HTTP methods to respond to the client's request."),
      ok(
        '6406533039533',
        "Server ready to respond to the client's request without knowing anything about the client.",
      ),
      no('6406533039534', 'Server use the URL to convey context to the client.'),
    ],
    solution: {
      verdict: "Server ready to respond to the client's request without knowing anything about the client.",
      explanation: [
        t('Stateless means the server retains **no memory of previous requests**. Every request must carry all the context needed to answer it, and any server in a pool can therefore answer any request.'),
        t('Reading the distractors:'),
        li([
          'The first is the definition of a **stateful** server — it is the exact opposite.',
          'The second describes HTTP methods, which are orthogonal: a stateful server also uses GET and POST.',
          'The fourth describes a technique for *carrying* context in a URL. That is a consequence of statelessness, not its definition, and it also gets the direction wrong — the client conveys context to the server.',
        ]),
      ],
      approach:
        'Reduce each option to "does the server remember?" — only one option answers no, and that is statelessness.',
      takeaways: [
        'Stateless: no retained client state between requests.',
        'The cost is repetition; the benefit is that any server can serve any request.',
      ],
    },
  },
  {
    id: 'ep6-q178',
    paperId: P,
    number: 178,
    sourceQuestionId: '640653902448',
    type: 'MSQ',
    marks: 2,
    title: 'Which command lines make the jinja template print "backend"',
    topicId: 'python-cli',
    subtopicId: 'sys-argv',
    difficulty: 'demanding',
    stem: [
      t('Consider the following Python code snippet “code.py”.'),
      py(
        `import sys\nfrom jinja2 import Template\nvars = sys.argv\n\ncourse_technologies = {'python': 'backend', 'javascript': 'frontend'}\ntemplate = Template("This course focuses on {{ technology }} development.")\n\nif len(vars) > 2 and vars[2] in course_technologies:\n    course = vars[1]\n    technology = course_technologies[course]\n    print(template.render(technology=technology))\nelse:\n    print("Please specify a valid course name!")`,
        'Filename: code.py',
      ),
      t(
        'Which of the following will be the correct command line input to the terminal to get the output: `This course focuses on backend development.` ?',
      ),
    ],
    options: [
      no('6406533039426', sh('python code.py course python')),
      ok('6406533039427', sh('python code.py python javascript')),
      ok('6406533039428', sh('python code.py python python')),
      no('6406533039429', sh('python code.py python backend')),
    ],
    solution: {
      verdict: '`python code.py python javascript` and `python code.py python python`.',
      explanation: [
        t('The code uses two different indices for two different purposes, which is the whole point of the question:'),
        li([
          '`vars[2]` is only used as the **gate** — it must be a key of the dictionary for the `if` to be entered at all.',
          '`vars[1]` is what is actually **looked up**, so it alone determines the printed technology.',
        ]),
        t('To print `backend`, `vars[1]` must be `python`. To get past the guard, `vars[2]` must be `python` or `javascript`.'),
        tbl(
          ['Command', '`vars[2]` passes the gate?', '`vars[1]`', 'Result'],
          [
            ['`code.py course python`', 'yes', '`course`', '`course_technologies["course"]` → **KeyError**'],
            ['`code.py python javascript`', 'yes', '`python`', '✅ `...focuses on backend development.`'],
            ['`code.py python python`', 'yes', '`python`', '✅ `...focuses on backend development.`'],
            ['`code.py python backend`', 'no — `backend` is a *value*, not a key', '—', '`Please specify a valid course name!`'],
          ],
        ),
        t('The last row is the trap worth remembering: `backend` appears in the dictionary, but as a value. `in` on a dict tests keys only.'),
      ],
      approach:
        'Separate the index used in the condition from the index used in the lookup. They are rarely the same in these questions.',
      takeaways: [
        '`x in some_dict` tests keys, never values.',
        'A guard that checks one argument while the body uses another is a deliberate trap — check both.',
      ],
    },
  },
  {
    id: 'ep6-q179',
    paperId: P,
    number: 179,
    sourceQuestionId: '640653902453',
    type: 'MSQ',
    marks: 2,
    title: 'Which URLs render what for a login route guarded by abort(400)',
    topicId: 'flask-routing',
    subtopicId: 'abort-errors',
    difficulty: 'moderate',
    stem: [
      t('Consider the following flask application.'),
      py(
        `from flask import Flask, abort, request\napp = Flask(__name__)\n\ndata = {"CS2001":"DBMS","CS2003":"MAD-I","CS2006":"MAD-II"}\n@app.route('/login')\ndef login():\n    username = request.args.get('uname')\n    if username not in data:\n        abort(400, "Bad Request: Invalid Username")\n    return f'<h1>Welcome to {data[username]} course!</h1>'\n\napp.run(debug=True)`,
        'app.py',
      ),
      t('Which of the following statements is/are true if the application is running locally on `http://127.0.0.1:5000` ?'),
    ],
    options: [
      no(
        '6406533039442',
        'For URL `http://127.0.0.1:5000?uname=CS2001` the browser will render **Welcome to DBMS course!**',
      ),
      no(
        '6406533039443',
        'For URL `http://127.0.0.1:5000/login` the browser will render **Welcome to MAD-I course!**',
      ),
      ok(
        '6406533039444',
        'For URL `http://127.0.0.1:5000/login?uname` the browser will render **Bad Request: Invalid Username**',
      ),
      ok(
        '6406533039445',
        'For URL `http://127.0.0.1:5000/login?uname=CS2006` the browser will render **Welcome to MAD-II course!**',
      ),
    ],
    solution: {
      verdict: 'The third and fourth statements.',
      explanation: [
        tbl(
          ['URL', 'What happens', 'Rendered'],
          [
            ['`/?uname=CS2001`', 'The path is `/`, and the only route is `/login` — no rule matches', '**404 Not Found**, so the statement is false'],
            ['`/login`', '`uname` is absent, so `.get` returns `None`; `None not in data` → `abort(400)`', '`Bad Request: Invalid Username`, not a welcome'],
            ['`/login?uname`', "A key with no value gives the empty string `''`, which is not in `data` → `abort(400)`", '✅ `Bad Request: Invalid Username`'],
            ['`/login?uname=CS2006`', '`CS2006` is a key; `data["CS2006"]` is `MAD-II`', '✅ `Welcome to MAD-II course!`'],
          ],
        ),
        t('The first statement fails for a reason that has nothing to do with the view body: the query string is right but the *path* is wrong. Always check the path against the rules first.'),
      ],
      approach: 'For each URL: match the path to a rule, then evaluate the query string, then run the body.',
      takeaways: [
        '`?uname` with no `=value` yields an empty string, not `None` — but both fail the membership test here.',
        'A correct query string on a non-existent path is still a 404.',
      ],
    },
  },
  {
    id: 'ep6-q180',
    paperId: P,
    number: 180,
    sourceQuestionId: '640653902449',
    type: 'MSQ',
    marks: 3,
    title: 'curl against a route that only allows GET',
    topicId: 'flask-routing',
    subtopicId: 'request-args',
    difficulty: 'moderate',
    stem: [
      t('Consider the following flask application.'),
      py(
        `from flask import Flask, request\napp = Flask(__name__)\n\n@app.route('/home')\ndef home():\n    var_a = request.args.get('method')\n    if var_a == "GET":\n        return "Hello from GET method"\n\n    elif var_a == "POST":\n        return "Hello from POST method"\n\n    else:\n        return "Invalid Method"\n\napp.run(debug=True)`,
      ),
      t('If the application is running locally on `http://127.0.0.1:5000` then which of the following statements are correct?'),
    ],
    options: [
      ok(
        '6406533039430',
        'The command `curl -X GET http://127.0.0.1:5000/home?method=GET` will give output as `Hello from GET method` on terminal',
      ),
      ok(
        '6406533039431',
        'The command `curl -X POST http://127.0.0.1:5000/home?method=POST` will give output as `Method not Allowed` on terminal',
      ),
      no(
        '6406533039432',
        'The command `curl -X POST http://127.0.0.1:5000/home?method=POST` will give output as `Hello from POST method` on terminal',
      ),
      no(
        '6406533039433',
        'The command `curl -X POST http://127.0.0.1:5000/home?method` will give output as `Invalid Method` on terminal',
      ),
    ],
    solution: {
      verdict: 'The first two statements.',
      explanation: [
        t('`@app.route(\'/home\')` carries no `methods=` argument, so the route accepts **GET only**. Everything else follows from that single fact.'),
        li([
          'A `GET` request reaches the view, `request.args.get(\'method\')` returns `"GET"`, and the first branch returns `Hello from GET method`. ✅',
          'A `POST` request is rejected by the routing layer with **405 Method Not Allowed**. The view function never runs. ✅',
        ]),
        t('The last two statements both assume the view body executed for a POST request. It did not — so the `elif` and `else` branches are unreachable by POST, whatever the query string says.'),
        t('The query parameter is deliberately named `method` to make it look as though it selects the HTTP verb. It does not; it is just data the view reads.'),
      ],
      approach:
        'Check the decorator for `methods=` before reading a single line of the body. If the verb is not allowed, the body is irrelevant.',
      takeaways: [
        'A route without `methods=` accepts GET only; anything else gets 405.',
        'A query parameter called `method` has no effect on the HTTP method.',
      ],
    },
  },
  {
    id: 'ep6-q181',
    paperId: P,
    number: 181,
    sourceQuestionId: '640653902471',
    type: 'MSQ',
    marks: 3,
    title: 'Reading relationship and backref values from a Python shell session',
    topicId: 'databases',
    subtopicId: 'relationships',
    difficulty: 'demanding',
    stem: [
      t('Consider the following flask_sqlalchemy data models “User” and “Role”.'),
      py(
        `class User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username= db.Column(db.String(), unique=True, nullable=False)\n    password = db.Column(db.String(), nullable=False)\n    email= db.Column(db.String())\n    roles= db.relationship("Role", backref="bearer")\n\nclass Role(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    r_name = db.Column(db.String(), unique=True, nullable=False)\n    user = db.Column(db.Integer, db.ForeignKey("user.id"))`,
      ),
      py(
        `>>> from app import *\n>>> db.create_all()\n>>> user1 = User(username="Rakesh",password="1234",email="user1@gmail.com")\n>>> user2 = User(username="Suresh",password="123",email="user2@gmail.com")\n>>> db.session.add_all([user1,user2])\n>>> db.session.commit()\n>>> r1=Role(r_name="instructor",user=1)\n>>> r2=Role(r_name="admin",user=1)\n>>> r3=Role(r_name="ops",user=2)\n>>> r4=Role(r_name="student",user=2)\n>>> db.session.add_all([r1,r2,r3,r4])\n>>> db.session.commit()\n>>> users = User.query.all()\n>>> roles = Role.query.all()`,
        'python shell',
      ),
      t('If the above commands are run in the python shell then which of the following options is /are correct with respect to these models?'),
    ],
    options: [
      no('6406533039514', out('Command: >>> users\nOutput:    [ "Ramesh", "Suresh" ]')),
      ok('6406533039515', out('Command: >>> u1 = users[1]\n         >>> u1.roles\nOutput:    [<Role 3>, <Role 4>]')),
      no('6406533039516', out('Command: >>> roles[2].user\nOutput:  ["Suresh"]')),
      ok('6406533039517', out('Command: >>> roles[3].user\nOutput:  2')),
      ok('6406533039518', out('Command: >>> roles[0].bearer\nOutput:  <User 1>')),
    ],
    solution: {
      verdict: 'The second, fourth and fifth statements.',
      explanation: [
        t('Both lists are zero-indexed and come back in primary-key order: `users` is `[user1, user2]`, `roles` is `[r1, r2, r3, r4]` with ids 1–4.'),
        tbl(
          ['Expression', 'Resolves to', 'Correct?'],
          [
            ['`users`', 'a list of `User` **objects**, printed as `[<User 1>, <User 2>]` — and the first username is `Rakesh`, not `Ramesh`', '❌ wrong on both counts'],
            ['`users[1].roles`', '`user2` (id 2); the relationship gathers every `Role` whose `user` column is 2 — those are `r3` and `r4`', '✅ `[<Role 3>, <Role 4>]`'],
            ['`roles[2].user`', '`r3`; `user` is the **foreign-key column**, an integer — so this is `2`, not a username', '❌'],
            ['`roles[3].user`', '`r4`, whose `user` column holds `2`', '✅ `2`'],
            ['`roles[0].bearer`', '`r1`; `bearer` is the backref created by `db.relationship(..., backref="bearer")`, so it returns the `User` object', '✅ `<User 1>`'],
          ],
        ),
        t('The distinction the question is really testing is between `Role.user` (a plain integer column) and `Role.bearer` (the ORM navigation attribute). They look interchangeable and are not.'),
      ],
      approach:
        'For each expression, decide first whether the attribute is a Column or a relationship/backref. Columns give raw values; relationships give objects.',
      takeaways: [
        '`backref="bearer"` adds `Role.bearer` returning the related `User` object.',
        'A foreign-key column returns the id, not the related object.',
        'Query results are lists of objects; their `repr` is `<Class id>`, not a field value.',
      ],
    },
  },
  {
    id: 'ep6-q182',
    paperId: P,
    number: 182,
    sourceQuestionId: '640653902477',
    type: 'MSQ',
    marks: 3,
    title: 'Filling in a route and a request accessor to read a query parameter',
    topicId: 'flask-routing',
    subtopicId: 'request-args',
    difficulty: 'moderate',
    stem: [
      t('Suppose a request `https://xyz.com?name=amey&age=34` generates the below response on the browser’s console,'),
      out('Name : amey'),
      t('The definition of the flask endpoint which handles the above request is given below,'),
      py(`@app.route(code1)\ndef getData():\n    data = code2\n    print("Name :", data)`),
      t('Which of the following options should be used to fill the placeholders “code1” and “code2”, to achieve the desired result as shown above?'),
    ],
    options: [
      no('6406533039539', py(`Code1: "/"\nCode2: request.form['name']`)),
      no('6406533039540', py(`Code1: "/", methods = ['GET']\nCode2: request.form['name']`)),
      ok('6406533039541', py(`Code1: "/", methods = ['GET', 'POST']\nCode2: request.args['name']`)),
      ok('6406533039542', py(`Code1: "/"\nCode2: request.args.get('name')`)),
    ],
    solution: {
      verdict: 'The third and fourth options.',
      explanation: [
        t('Two independent requirements, and each option gets one or both wrong.'),
        li(
          [
            '**The path.** `https://xyz.com?name=amey&age=34` has path `/`, so `code1` must route `/`. All four options do.',
            '**The method.** Visiting a URL is a GET. A route accepts GET by default, and `methods=[\'GET\', \'POST\']` also includes it — so both are fine. `methods=[\'GET\']` alone would be fine too.',
            '**The accessor.** The data is in the **query string**, which lives in `request.args`. `request.form` reads a form-encoded request *body*, which this request does not have — it would raise a 400.',
          ],
          true,
        ),
        t('So the accessor is the discriminator: the two `request.form` options fail regardless of their route configuration, and both `request.args` options succeed. `request.args[\'name\']` and `request.args.get(\'name\')` behave identically here, since `name` is present.'),
      ],
      approach:
        'Ask where the data physically is — URL or body — before comparing the route decorators. That settles most options on its own.',
      takeaways: [
        '`request.args` = query string; `request.form` = form-encoded body.',
        'A route accepts GET without declaring it; listing extra methods does not break GET.',
      ],
    },
  },
  {
    id: 'ep6-q183',
    paperId: P,
    number: 183,
    sourceQuestionId: '640653902461',
    type: 'MSQ',
    marks: 4.5,
    title: 'Which marker selections give "1 passed, 3 deselected"',
    topicId: 'testing',
    subtopicId: 'selection',
    difficulty: 'demanding',
    stem: [
      t('Consider the following function to be tested and test functions given in the Python code snippet below.'),
      py(
        `import pytest\n\ndef square(x):\n    sum = 0\n    for counter in range(x):\n      sum += x\n      return sum\n\n@pytest.mark.marker1\ndef testcase_1():\n    assert square(10) == 100\n\n@pytest.mark.marker2\ndef testcase_2():\n    assert square(4) == 4\n\n@pytest.mark.marker3\ndef testcase_3():\n    assert square(5) == 25\n\n@pytest.mark.marker4\ndef testcase_4():\n    assert square(6) == 6`,
        'test_file.py',
      ),
      t('On running this file on the terminal using pytest, the summary of the output is;'),
      out('========= 1 passed, 3 deselected, 4 warnings in 0.04s ========='),
      t('What command will result into the outcome given above?'),
    ],
    options: [
      ok('6406533039474', sh('pytest test_file.py -m marker4')),
      no('6406533039475', sh('pytest test_file.py -m marker1')),
      ok('6406533039476', sh('pytest test_file.py -m marker2')),
      no('6406533039477', sh('pytest test_file.py -m marker3')),
    ],
    solution: {
      verdict: '`-m marker4` and `-m marker2`.',
      explanation: [
        t('The bug is the indentation: `return sum` sits **inside** the `for` loop, so the loop always exits on its first iteration. For any `x > 0`, `square(x)` returns `x` — not `x²`.'),
        tbl(
          ['Test', 'Marker', 'Assertion', '`square(x)` actually returns', 'Result'],
          [
            ['`testcase_1`', 'marker1', '`square(10) == 100`', '`10`', 'fails'],
            ['`testcase_2`', 'marker2', '`square(4) == 4`', '`4`', '**passes**'],
            ['`testcase_3`', 'marker3', '`square(5) == 25`', '`5`', 'fails'],
            ['`testcase_4`', 'marker4', '`square(6) == 6`', '`6`', '**passes**'],
          ],
        ),
        t('The summary reports **1 passed, 3 deselected**, so exactly one test ran and it passed. That means selecting a marker whose test passes: `marker2` or `marker4`.'),
        t('The **4 warnings** confirm the mechanism: none of the four markers is registered in a config file, so pytest emits one unknown-marker warning per marker — including for the three it deselected.'),
      ],
      approach:
        'Work out what the function really returns before reading any assertion. Then match the summary counts: "1 passed, 3 deselected" means one selected test, and it passed.',
      takeaways: [
        'A `return` inside a loop body exits on the first iteration.',
        '`-m` deselects non-matching tests rather than failing them.',
        'Unregistered markers produce one warning each — a reliable signal that `-m` was used.',
      ],
    },
  },
  {
    id: 'ep6-q184',
    paperId: P,
    number: 184,
    sourceQuestionId: '640653902468',
    type: 'MSQ',
    marks: 4.5,
    title: 'Trailing slashes and which error handler fires',
    topicId: 'flask-routing',
    subtopicId: 'abort-errors',
    difficulty: 'demanding',
    stem: [
      t('Consider the following flask application.'),
      py(
        `from flask import Flask, abort\napp = Flask(__name__)\nmodules = ['python', 'react', 'node']\n\n@app.route('/home/modules/')\ndef all_modules():\n    return f"<h3>List of modules: {modules}</h3>"\n\n@app.route('/get/<string:module_1>')\ndef get_module(module_1):\n    if module_1 in modules:\n        return f"<h3>One module found: {module_1}.</h3>"\n    else:\n        abort(400)\n\n@app.errorhandler(400)\ndef module_error(error):\n    return "<h3>Cannot find module</h3>"\n\n@app.errorhandler(404)\ndef module_error(error):\n    return "<h3>Incorrect Path</h3>"\n\napp.run(debug=True)`,
      ),
      t('If the application is running locally on `http://127.0.0.1:5000`, select the correct statement(s).'),
    ],
    options: [
      ok(
        '6406533039502',
        "For the URL, `http://127.0.0.1:5000/home/modules`, the browser will render; **List of modules: ['python', 'react', 'node']**",
      ),
      no('6406533039503', 'For the URL, `http://127.0.0.1:5000/home/modules`, the browser will render; **Incorrect Path**'),
      ok('6406533039504', 'For the URL, `http://127.0.0.1:5000/get/vuejs`, the browser will render; **Cannot find module**'),
      no('6406533039505', 'For the URL, `http://127.0.0.1:5000/get/react/`, the browser will render; **One module found: react.**'),
    ],
    solution: {
      verdict: 'The first and third statements.',
      explanation: [
        t('Flask treats a trailing slash asymmetrically, and this question tests both directions at once.'),
        tbl(
          ['URL', 'Rule', 'What Flask does', 'Rendered'],
          [
            ['`/home/modules`', "`/home/modules/` — **with** a trailing slash", 'Redirects to the canonical `/home/modules/` and serves it', "✅ `List of modules: ['python', 'react', 'node']`"],
            ['`/get/vuejs`', '`/get/<string:module_1>`', "`vuejs` is not in `modules` → `abort(400)` → the 400 handler", '✅ `Cannot find module`'],
            ['`/get/react/`', '`/get/<string:module_1>` — **without** a trailing slash', 'No redirect in this direction: the URL simply does not match → 404 → the 404 handler', '❌ `Incorrect Path`, not the module message'],
          ],
        ),
        t('The rule in one sentence: **a rule ending in `/` will redirect the slash-less URL to it; a rule not ending in `/` will 404 on the URL with the extra slash.** The redirect is a convenience Flask offers in one direction only.'),
        t('The second statement fails on the same reasoning as the first — `/home/modules` reaches its view, so no 404 handler is involved.'),
      ],
      approach:
        'Compare each URL character-for-character against the rule, trailing slash included, then decide which error code (if any) is raised.',
      takeaways: [
        'Rule with trailing slash + URL without → 308 redirect, then normal handling.',
        'Rule without trailing slash + URL with → 404.',
        '`abort(400)` fires the 400 handler; an unmatched URL fires the 404 handler.',
      ],
    },
  },
  {
    id: 'ep6-q185',
    paperId: P,
    number: 185,
    sourceQuestionId: '640653902474',
    type: 'MSQ',
    marks: 4.5,
    title: 'Returning a real 404 when a record does not exist',
    topicId: 'databases',
    subtopicId: 'queries',
    difficulty: 'moderate',
    stem: [
      t('Consider the following code snippet.'),
      py(`@app.route('/student/<student_id>')\ndef profile(student_id):\n     # CODE BLOCK HERE`),
      t(
        'Assume the database has a `"student"` table which has a TEXT column `"student_id"`. If we want the server to return a 404 status code when a user goes to the route `\'/student/<student_id>\'` with a student_id that does not exist in the database, which of the following lines would give us the desired output?',
      ),
    ],
    options: [
      ok(
        '6406533039527',
        py(`student = Student.query.filter_by(student_id=student_id).first()\nif student is None:\n    abort(404)\nreturn render_template('profile.html', student=student)`),
      ),
      no(
        '6406533039528',
        py(`student = Student.query.filter_by(student_id=student_id).first()\nif student is None:\n    return render_template("404.html")\nreturn render_template('profile.html', student=student)`),
      ),
      ok(
        '6406533039529',
        py(`student = Student.query.filter_by(student_id=student_id).first_or_404()\nreturn render_template('profile.html', student=student)`),
      ),
      ok(
        '6406533039530',
        py(`student = Student.query.filter_by(student_id=student_id).first()\nif student is None:\n    return render_template("404.html"), 404\nreturn render_template('profile.html', student=student)`),
      ),
    ],
    solution: {
      verdict: 'The first, third and fourth options.',
      explanation: [
        t('The requirement is specifically about the **status code**, not about what the page looks like. Three of the four options set it; one only changes the body.'),
        tbl(
          ['Option', 'Status returned', 'Correct?'],
          [
            ['`abort(404)`', 'Raises the 404 HTTP exception directly', '✅'],
            ['`return render_template("404.html")`', 'A rendered template with **no** status is returned as **200 OK**', '❌ the page says "not found" while the response says "here it is"'],
            ['`first_or_404()`', 'Returns the record or raises 404 — the idiomatic one-liner', '✅'],
            ['`return render_template("404.html"), 404`', 'A `(body, status)` tuple explicitly sets 404', '✅'],
          ],
        ),
        t('The failing option is worth dwelling on because it is the most tempting: a human reading the page sees an error, but a browser, a crawler or an API client reads the status line and concludes the request succeeded.'),
      ],
      approach:
        'Ask what status each `return` produces, not what it displays. A bare `render_template` is always 200.',
      takeaways: [
        'Returning a tuple `(body, status)` is how you set a status code alongside a rendered template.',
        '`first_or_404()` collapses the null check and the abort into one call.',
      ],
    },
  },
  {
    id: 'ep6-q186',
    paperId: P,
    number: 186,
    sourceQuestionId: '640653902451',
    type: 'MSQ',
    marks: 4.5,
    comprehensionId: 'ep6-c1',
    title: 'Which command and URL pair produce "Welcome to Application Development!"',
    topicId: 'python-cli',
    subtopicId: 'sys-argv',
    difficulty: 'demanding',
    stem: [
      t(
        'What should be the code to run the application, and what should be the URL respectively such that the browser gives output as: `Welcome to Application Development!` ?',
      ),
    ],
    options: [
      no(
        '6406533039434',
        sh('Code: python app.py Application Development DBMS'),
        t('URL: `http://127.0.0.1:5000/course?course=Application Development`'),
      ),
      ok(
        '6406533039435',
        sh('Code: python app.py "Application Development" Java'),
        t('URL: `http://127.0.0.1:5000/course?course=Application`'),
      ),
      no(
        '6406533039436',
        sh('Code: python app.py Application Development DBMS'),
        t('URL: `http://127.0.0.1:5000/course?course=Application`'),
      ),
      ok(
        '6406533039437',
        sh('Code: python app.py "Application Development" DBMS'),
        t('URL: `http://127.0.0.1:5000/course?course=Application Development`'),
      ),
    ],
    solution: {
      verdict: 'The second and fourth options.',
      explanation: [
        t('The view prints `Welcome to {sys.argv[1]}!` only when **both** conditions hold: `course` is a substring of `sys.argv[1]`, and `sys.argv[1]` is one of the three entries in `data`. So `sys.argv[1]` must be exactly `Application Development`, which requires the quotes on the command line.'),
        tbl(
          ['Option', '`sys.argv[1]`', '`course`', '`course in argv[1]`?', '`argv[1] in data`?', 'Output'],
          [
            ['1', '`Application`', '`Application Development`', 'no', '—', '`Invalid Data`'],
            ['2', '`Application Development`', '`Application`', 'yes', 'yes', '✅ `Welcome to Application Development!`'],
            ['3', '`Application`', '`Application`', 'yes', 'no (`Application` is not in `data`)', '`Welcome to Application!`'],
            ['4', '`Application Development`', '`Application Development`', 'yes', 'yes', '✅ `Welcome to Application Development!`'],
          ],
        ),
        t('Row 1 is the one people get wrong: without quotes, `sys.argv[1]` is only `Application`, and the substring test runs the *other* way round — the long query value is not contained in the short argument.'),
        t('Row 3 shows why the inner `if` matters: the guard passes, but because `Application` is not an entry in `data`, control falls through to the second `return` and prints the query value instead.'),
      ],
      approach:
        'Write down `sys.argv[1]` and `course` as two literal strings, then evaluate `course in argv[1]` in that exact direction.',
      takeaways: [
        'Quotes on the command line decide whether a multi-word value is one argument or several.',
        '`a in b` for strings is a substring test, and the order matters.',
      ],
    },
  },
  {
    id: 'ep6-q187',
    paperId: P,
    number: 187,
    sourceQuestionId: '640653902452',
    type: 'MCQ',
    marks: 3,
    comprehensionId: 'ep6-c1',
    title: 'Output when the multi-word argument is left unquoted',
    topicId: 'python-cli',
    subtopicId: 'sys-argv',
    difficulty: 'moderate',
    stem: [
      t('What will be the output given by browser if the application is run with command'),
      sh('python app.py Application Development DBMS'),
      t('on terminal with URL: `http://127.0.0.1:5000/course?course=Application Development` ?'),
    ],
    options: [
      no('6406533039438', out('Welcome to Application Development!')),
      no('6406533039439', out('Welcome to DBMS!')),
      ok('6406533039440', out('Invalid Data')),
      no('6406533039441', out('Not Found')),
    ],
    solution: {
      verdict: 'Invalid Data.',
      explanation: [
        t('Without quotes the command line splits into four elements:'),
        out("sys.argv == ['app.py', 'Application', 'Development', 'DBMS']"),
        t('so `sys.argv[1]` is just `Application`. The query string supplies `course = "Application Development"`.'),
        t('The guard is `if course in sys.argv[1]`, i.e. `"Application Development" in "Application"` — asking whether the **longer** string is contained in the **shorter** one. It is not, so control goes straight to `else` and the view returns `Invalid Data`.'),
        t('`Not Found` would require the path to be wrong; `/course` matches the route, so the request is handled normally.'),
      ],
      approach:
        'Expand `sys.argv` literally, then read the `in` test in the direction the code actually writes it.',
      takeaways: [
        'The same app gives completely different answers depending only on shell quoting.',
        'Reaching the `else` branch means a 200 response carrying `Invalid Data`, not a 404.',
      ],
    },
  },
];
