export enum StorageKey {
    CODE_TO_COMMENT = 'code_to_comment',
    NOTES = 'notes',
    BROWSER_NAME = 'browser_name',
    SIDE_PANEL_STATE = 'side_panel_state',
    IS_ONBOARDING = 'is_onboarding',
}

export const GITHUB_ONBOARDING_URL =
    'https://github.com/codenote-dev/browser-extension/blob/main/package.json';

export enum BrowserName {
    Arc = 'Arc',
    Chrome = 'Chrome',
    Edge = 'Microsoft Edge',
    Firefox = 'Firefox',
    InternetExplorer = 'Internet Explorer',
    Opera = 'Opera',
    Safari = 'Safari',
    Unknown = 'Unknown',
}

export enum OnboardingEvent {
    GithubOpenLineMenu = 'github_open_line_menu',
    GithubOpenSidebar = 'github_open_sidebar',
}

export const LANGUAGE_TO_ALIASES = {
    abnf: ['abnf'],
    oneC: ['oneC', '1c'],
    accesslog: ['accesslog'],
    actionscript: ['actionscript'],
    ada: ['ada'],
    angelscript: ['angelscript', 'asc'],
    apache: ['apache', 'apacheconf'],
    applescript: ['applescript', 'osascript'],
    arcade: ['arcade'],
    arduino: ['arduino', 'ino'],
    armasm: ['armasm', 'asm'],
    asciidoc: ['asciidoc', 'adoc'],
    aspectj: ['aspectj'],
    autohotkey: ['autohotkey'],
    autoit: ['autoit'],
    avrasm: ['avrasm'],
    awk: ['awk', 'mawk', 'nawk', 'gawk'],
    axapta: ['axapta', 'x++'],
    bash: ['bash', 'sh', 'zsh'],
    basic: ['basic'],
    bnf: ['bnf'],
    brainfuck: ['brainfuck', 'bf'],
    c: ['c', 'h'],
    cal: ['cal'],
    capnproto: ['capnproto', 'capnp'],
    ceylon: ['ceylon'],
    clean: ['clean'],
    clojureRepl: ['clojureRepl', 'clojure-repl'],
    clojure: ['clojure', 'clj'],
    cmake: ['cmake', 'cmake.in'],
    coffeescript: ['coffeescript', 'coffee', 'cson', 'iced'],
    coq: ['coq'],
    cos: ['cos', 'cls'],
    cpp: ['cpp', 'hpp', 'cc', 'hh', 'c++', 'h++', 'cxx', 'hxx'],
    crmsh: ['crmsh', 'crm', 'pcmk'],
    crystal: ['crystal', 'cr'],
    csharp: ['csharp', 'cs'],
    csp: ['csp'],
    css: ['css'],
    d: ['d'],
    dart: ['dart'],
    delphi: ['delphi', 'dpr', 'dfm', 'pas', 'pascal'],
    diff: ['diff', 'patch'],
    django: ['django', 'jinja'],
    dns: ['dns', 'zone', 'bind'],
    dockerfile: ['dockerfile', 'docker'],
    dos: ['dos', 'bat', 'cmd'],
    dsconfig: ['dsconfig'],
    dts: ['dts'],
    dust: ['dust', 'dst'],
    ebnf: ['ebnf'],
    elixir: ['elixir'],
    elm: ['elm'],
    erb: ['erb'],
    erlangRepl: ['erlangRepl', 'erlang-repl'],
    erlang: ['erlang', 'erl'],
    excel: ['excel', 'xls', 'xlsx'],
    fix: ['fix'],
    flix: ['flix'],
    fortran: ['fortran', 'f90', 'f95'],
    fsharp: ['fsharp', 'fs', 'fsx', 'fsi', 'fsscript'],
    gams: ['gams', 'gms'],
    gauss: ['gauss', 'gss'],
    gcode: ['gcode', 'nc'],
    gherkin: ['gherkin'],
    glsl: ['glsl'],
    gml: ['gml'],
    go: ['go', 'golang'],
    golo: ['golo', 'gololang'],
    gradle: ['gradle'],
    groovy: ['groovy'],
    haml: ['haml'],
    handlebars: ['handlebars', 'hbs', 'html.hbs', 'html.handlebars'],
    haskell: ['haskell', 'hs'],
    haxe: ['haxe', 'hx'],
    hsp: ['hsp'],
    http: ['http', 'https'],
    hy: ['hy', 'hylang'],
    inform7: ['inform7', 'i7'],
    ini: ['ini', 'toml'],
    irpf90: ['irpf90'],
    isbl: ['isbl'],
    java: ['java', 'jsp'],
    javascript: ['javascript', 'js', 'jsx'],
    jbossCli: ['jbossCli', 'jboss-cli'],
    json: ['json', 'jsonp'],
    juliaRepl: ['juliaRepl', 'julia-repl'],
    julia: ['julia', 'jl'],
    kotlin: ['kotlin', 'kt'],
    lasso: ['lasso', 'ls', 'lassoscript'],
    latex: ['latex', 'tex'],
    ldif: ['ldif'],
    leaf: ['leaf'],
    less: ['less'],
    lisp: ['lisp'],
    livecodeserver: ['livecodeserver'],
    livescript: ['livescript', 'ls'],
    llvm: ['llvm'],
    lsl: ['lsl'],
    lua: ['lua'],
    makefile: ['makefile', 'mk', 'mak', 'make'],
    markdown: ['markdown', 'md', 'mkdown', 'mkd'],
    mathematica: ['mathematica', 'mma', 'wl'],
    matlab: ['matlab'],
    maxima: ['maxima'],
    mel: ['mel'],
    mercury: ['mercury'],
    mipsasm: ['mipsasm', 'mips'],
    mizar: ['mizar'],
    mojolicious: ['mojolicious'],
    monkey: ['monkey'],
    moonscript: ['moonscript', 'moon'],
    n1ql: ['n1ql'],
    nginx: ['nginx', 'nginxcong'],
    nim: ['nim', 'nimrod'],
    nix: ['nix'],
    nodeRepl: ['nodeRepl', 'node-repl'],
    nsis: ['nsis'],
    objectivec: [
        'objectivec',
        'mm',
        'objc',
        'obj-c',
        'obj-c++',
        'objective-c++',
    ],
    ocaml: ['ocaml', 'ml'],
    openscad: ['openscad', 'scad'],
    oxygene: ['oxygene'],
    parser3: ['parser3'],
    perl: ['perl', 'pl', 'pm'],
    pf: ['pf', 'pf.conf'],
    pgsql: ['pgsql', 'postgres', 'postgresql'],
    phpTemplate: ['phpTemplate', 'php-template'],
    php: ['php'],
    plaintext: ['plaintext', 'txt', 'text'],
    pony: ['pony'],
    powershell: ['powershell', 'ps', 'ps1'],
    processing: ['processing'],
    profile: ['profile'],
    prolog: ['prolog'],
    properties: ['properties'],
    protobuf: ['protobuf', 'proto'],
    puppet: ['puppet', 'pp'],
    purebasic: ['purebasic'],
    pythonRepl: ['pythonRepl', 'python-repl', 'pycon'],
    python: ['python', 'py', 'gyp'],
    q: ['q', 'k', 'kdb'],
    qml: ['qml', 'qml'],
    r: ['r'],
    reasonml: ['reasonml', 're'],
    rib: ['rib'],
    roboconf: ['roboconf', 'graph', 'instances'],
    routeros: ['routeros'],
    rsl: ['rsl'],
    ruby: ['ruby', 'rb', 'gemspec', 'rpm-spec', 'specfile'],
    ruleslanguage: ['ruleslanguage'],
    rust: ['rust', 'rs'],
    sas: ['sas'],
    scala: ['scala'],
    scheme: ['scheme'],
    scilab: ['scilab', 'sci'],
    scss: ['scss'],
    shell: ['shell', 'console'],
    smali: ['smali'],
    smalltalk: ['smalltalk', 'st'],
    sml: ['sml', 'ml'],
    sqf: ['sqf'],
    sql: ['sql'],
    stan: ['stan', 'stanfuncs'],
    stata: ['stata'],
    step21: ['step21', 'p21', 'step', 'stp'],
    stylus: ['stylus', 'styl'],
    subunit: ['subunit'],
    swift: ['swift'],
    taggerscript: ['taggerscript'],
    tap: ['tap'],
    tcl: ['tcl', 'tk'],
    thrift: ['thrift'],
    tp: ['tp'],
    twig: ['twig', 'craftcms'],
    typescript: ['typescript', 'ts', 'tsx', 'mts', 'cts'],
    vala: ['vala'],
    vbnet: ['vbnet', 'vb'],
    vbscriptHtml: ['vbscriptHtml', 'vbscript-html'],
    vbscript: ['vbscript', 'vbs'],
    verilog: ['verilog', 'v'],
    vhdl: ['vhdl'],
    vim: ['vim'],
    x86asm: ['x86asm'],
    xl: ['xl', 'tao'],
    xml: [
        'xml',
        'html',
        'xhtml',
        'rss',
        'atom',
        'xjb',
        'xsd',
        'xsl',
        'plist',
        'svg',
    ],
    xquery: ['xquery', 'xpath', 'xq', 'xqm'],
    yaml: ['yaml', 'yml'],
    zephir: ['zephir', 'zep'],
} as const;
