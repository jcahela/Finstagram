+ Initially I removed some awaits on dispatches, which I had researched should only be present on methods that return Promises. Upon removing it from my onLogin method, however, it crashed as soon as an error arose, albeit my linter stated 'await' has no effect on the type of this expression.
+ For security and aesthetic purposes, the autocomplete is turned off on the forms. Google has pattern matching algorithms, however, which  attempt to pick up any indicators that the field is referencing an email. It searches for placeholders and if no placeholder is set, it looks at any available labels, in my case it tried to read my aria-label. Note that autocomplete='off' doesn't work by itself though it does take care of some inputs. One has to experiment with words to bypass this behavior.
+ Albeit the !important tag is largely frowned upon in the CSS community, I discovered no other concise way to remove the text-decoration: underline that is applied to the React Link component. By targeting the link with a class and applying text-decoration: none!important; to that class, I successfully—and concisely—eliminate the underline with no need to target every pseudo-class of the component on the React-side like:
    ```
    const StyledLink = styled(Link)
        `text-decoration: none;

        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
        }`;
    ```
