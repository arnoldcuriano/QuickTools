export interface ReferenceEntry {
  key: string;
  name: string;
  description: string;
}

export const mimeTypes: readonly ReferenceEntry[] = [
  ['.html', 'text/html', 'HTML document'], ['.css', 'text/css', 'Cascading Style Sheet'], ['.js', 'text/javascript', 'JavaScript source'],
  ['.json', 'application/json', 'JSON document'], ['.xml', 'application/xml', 'XML document'], ['.txt', 'text/plain', 'Plain text'],
  ['.csv', 'text/csv', 'Comma-separated values'], ['.md', 'text/markdown', 'Markdown document'], ['.pdf', 'application/pdf', 'PDF document'],
  ['.zip', 'application/zip', 'ZIP archive'], ['.gz', 'application/gzip', 'Gzip archive'], ['.wasm', 'application/wasm', 'WebAssembly binary'],
  ['.png', 'image/png', 'PNG image'], ['.jpg', 'image/jpeg', 'JPEG image'], ['.jpeg', 'image/jpeg', 'JPEG image'],
  ['.gif', 'image/gif', 'GIF image'], ['.webp', 'image/webp', 'WebP image'], ['.svg', 'image/svg+xml', 'SVG image'],
  ['.ico', 'image/vnd.microsoft.icon', 'Icon image'], ['.avif', 'image/avif', 'AVIF image'], ['.mp3', 'audio/mpeg', 'MPEG audio'],
  ['.wav', 'audio/wav', 'Wave audio'], ['.ogg', 'audio/ogg', 'Ogg audio'], ['.mp4', 'video/mp4', 'MP4 video'],
  ['.webm', 'video/webm', 'WebM video'], ['.woff', 'font/woff', 'Web Open Font Format'], ['.woff2', 'font/woff2', 'Web Open Font Format 2'],
  ['.ttf', 'font/ttf', 'TrueType font'], ['.otf', 'font/otf', 'OpenType font'], ['.bin', 'application/octet-stream', 'Generic binary data'],
].map(([key, name, description]) => ({ key, name, description }));

const controlNames = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'HT', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US'];
const c1ControlNames = ['PAD', 'HOP', 'BPH', 'NBH', 'IND', 'NEL', 'SSA', 'ESA', 'HTS', 'HTJ', 'VTS', 'PLD', 'PLU', 'RI', 'SS2', 'SS3', 'DCS', 'PU1', 'PU2', 'STS', 'CCH', 'MW', 'SPA', 'EPA', 'SOS', 'SGCI', 'SCI', 'CSI', 'ST', 'OSC', 'PM', 'APC'];
export const asciiEntries: readonly ReferenceEntry[] = Array.from({ length: 256 }, (_, code) => ({
  key: String(code),
  name: code < 32 ? controlNames[code] : code < 127 ? String.fromCodePoint(code) : code === 127 ? 'DEL' : code < 160 ? c1ControlNames[code - 128] : String.fromCodePoint(code),
  description: `Hex ${code.toString(16).toUpperCase().padStart(2, '0')} - ${code < 128 ? code < 32 || code === 127 ? 'ASCII control character' : 'Printable ASCII character' : code < 160 ? 'ISO-8859-1 control character' : 'ISO-8859-1 extended character'}`,
}));

export const gitCommands: readonly ReferenceEntry[] = [
  ['git init', 'Initialize repository', 'Create an empty Git repository.'],
  ['git clone <url>', 'Clone repository', 'Copy a remote repository locally.'],
  ['git status', 'Show status', 'Show staged, unstaged, and untracked changes.'],
  ['git add <path>', 'Stage changes', 'Add path changes to the index.'],
  ['git commit -m <message>', 'Commit changes', 'Record staged changes with a message.'],
  ['git diff', 'Inspect changes', 'Show unstaged line changes.'],
  ['git diff --staged', 'Inspect staged changes', 'Show changes staged for the next commit.'],
  ['git log --oneline', 'Compact history', 'Show commit history one line per commit.'],
  ['git branch', 'List branches', 'List local branches.'],
  ['git switch <branch>', 'Switch branch', 'Change the current branch.'],
  ['git switch -c <branch>', 'Create branch', 'Create and switch to a new branch.'],
  ['git merge <branch>', 'Merge branch', 'Merge another branch into the current branch.'],
  ['git rebase <branch>', 'Rebase commits', 'Replay current commits on another branch.'],
  ['git fetch', 'Fetch remotes', 'Download remote refs without merging.'],
  ['git pull --ff-only', 'Fast-forward pull', 'Fetch and update only when no merge commit is needed.'],
  ['git push', 'Push commits', 'Upload local commits to the configured remote.'],
  ['git remote -v', 'List remotes', 'Show remote names and URLs.'],
  ['git tag', 'List tags', 'List repository tags.'],
  ['git stash push', 'Stash changes', 'Temporarily store working-tree changes.'],
  ['git stash pop', 'Restore stash', 'Apply and remove the latest stash.'],
  ['git restore <path>', 'Restore file', 'Restore a working-tree path from the index.'],
  ['git restore --staged <path>', 'Unstage path', 'Remove a path from the index without discarding edits.'],
  ['git show <revision>', 'Show object', 'Display a commit or another Git object.'],
  ['git bisect start', 'Start bisection', 'Begin a binary search for a faulty commit.'],
  ['git clean -n', 'Preview cleanup', 'List untracked files that would be removed.'],
].map(([key, name, description]) => ({ key, name, description }));

export const httpHeaders: readonly ReferenceEntry[] = [
  ['Accept', 'Request', 'Media types the client can process.'], ['Accept-Encoding', 'Request', 'Content codings the client can decode.'],
  ['Accept-Language', 'Request', 'Preferred response languages.'], ['Authorization', 'Request', 'Credentials for authenticating the request.'],
  ['Cache-Control', 'Request or response', 'Caching directives for browsers and intermediaries.'], ['Content-Disposition', 'Response', 'Inline or attachment presentation metadata.'],
  ['Content-Encoding', 'Response', 'Encoding applied to the representation.'], ['Content-Length', 'Request or response', 'Representation length in bytes.'],
  ['Content-Security-Policy', 'Response', 'Controls permitted content sources and execution.'], ['Content-Type', 'Request or response', 'Media type of the representation.'],
  ['Cookie', 'Request', 'Stored cookies sent to the server.'], ['ETag', 'Response', 'Identifier for a specific representation version.'],
  ['Expires', 'Response', 'Date after which a cached response is stale.'], ['Host', 'Request', 'Target host and optional port.'],
  ['If-Match', 'Request', 'Makes a request conditional on matching entity tags.'], ['If-Modified-Since', 'Request', 'Requests content only when modified after a date.'],
  ['If-None-Match', 'Request', 'Makes a request conditional on nonmatching entity tags.'], ['Last-Modified', 'Response', 'Date the resource was last modified.'],
  ['Link', 'Response', 'Typed relationships to other resources.'], ['Location', 'Response', 'Redirect target or newly created resource URL.'],
  ['Origin', 'Request', 'Origin that initiated a cross-origin request.'], ['Referer', 'Request', 'Address of the referring document.'],
  ['Retry-After', 'Response', 'Time to wait before another request.'], ['Sec-Fetch-Site', 'Request', 'Relationship between request initiator and target origins.'],
  ['Set-Cookie', 'Response', 'Creates or updates a browser cookie.'], ['Strict-Transport-Security', 'Response', 'Requires future HTTPS connections.'],
  ['User-Agent', 'Request', 'Information about the requesting client.'], ['Vary', 'Response', 'Request headers used to select the cached response.'],
  ['WWW-Authenticate', 'Response', 'Authentication methods accepted by the server.'], ['X-Content-Type-Options', 'Response', 'Disables MIME type sniffing when set to nosniff.'],
].map(([key, name, description]) => ({ key, name, description }));

export const regexSyntax: readonly ReferenceEntry[] = [
  ['.', 'Any character', 'Matches any character except a line terminator unless dotAll is enabled.'],
  ['\\d', 'Digit', 'Matches an ASCII digit.'], ['\\D', 'Not digit', 'Matches a character that is not an ASCII digit.'],
  ['\\w', 'Word character', 'Matches an ASCII letter, digit, or underscore.'], ['\\W', 'Not word character', 'Matches a non-word character.'],
  ['\\s', 'Whitespace', 'Matches whitespace.'], ['\\S', 'Not whitespace', 'Matches a non-whitespace character.'],
  ['^', 'Start assertion', 'Matches the beginning of input or line in multiline mode.'], ['$','End assertion', 'Matches the end of input or line in multiline mode.'],
  ['*', 'Zero or more', 'Repeats the preceding item zero or more times.'], ['+', 'One or more', 'Repeats the preceding item one or more times.'],
  ['?', 'Optional or lazy', 'Makes an item optional, or a quantifier lazy.'], ['{n}', 'Exact count', 'Repeats the preceding item exactly n times.'],
  ['{n,m}', 'Count range', 'Repeats the preceding item from n through m times.'], ['[abc]', 'Character class', 'Matches one character included in the class.'],
  ['[^abc]', 'Negated class', 'Matches one character not included in the class.'], ['(abc)', 'Capturing group', 'Groups input and stores the matched substring.'],
  ['(?:abc)', 'Noncapturing group', 'Groups input without storing a capture.'], ['(?<name>abc)', 'Named capture', 'Stores a captured substring under a name.'],
  ['a|b', 'Alternation', 'Matches the expression on either side.'], ['(?=abc)', 'Positive lookahead', 'Requires the following input to match.'],
  ['(?!abc)', 'Negative lookahead', 'Requires the following input not to match.'], ['(?<=abc)', 'Positive lookbehind', 'Requires the preceding input to match.'],
  ['(?<!abc)', 'Negative lookbehind', 'Requires the preceding input not to match.'], ['\\p{L}', 'Unicode property', 'Matches a Unicode letter when the u or v flag is enabled.'],
].map(([key, name, description]) => ({ key, name, description }));
