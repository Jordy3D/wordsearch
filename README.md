<div align="center">
  <h1>words</h1>
  <p>a weird word searching thing</p>
</div>

Search for words within a dictionary based on a set of controls.

## Controls

| Control | Description |
| --- | --- |
| Letters to search for | Find words containing the letters |
| All Toggle | Find words containing all the letters in the Letters to search for field |
| Min Word Length | Find words with more than X letters |
| Max Word Length | Find words with less than X letters |
| Letter Pool | Find words that can be made from the letters in the Letter Pool field |
| Exclude Toggle | Find words that do not contain the letters in the Letters to search for field |
| Pattern | Find words that match a pattern (see below) |
| Dictionary | Select the dictionary to search in |

### Patterns

Patterns are a way to search for words that match a specific pattern.
The primary format is a combination of underscores, and lowercase and uppercase letters.

| Character | Description |
| --- | --- |
| underscore ( \_ ) | Any character |
| lowercase (a-z) | This letter exists in the word but not in the same position |
| uppercase (A-Z) | This letter exists in the word and in the same position |

## Notes

-   Searches are case-insensitive
-   Searching may take a while depending on the dictionary and the search parameters
    -   This may also cause the page to become unresponsive or crash
-   The dictionaries may contain non-real words, or may be missing real words

## Dictionaries

| Name | Source |
| --- | --- |
| Full | [Link](https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt) |
| Small | [Link](https://www.mit.edu/~ecprice/wordlist.10000) |
| Wordle (Full) | [Link](https://gist.github.com/cfreshman/d97dbe7004522f7bc52ed2a6e22e2c04) |
| Wordle (Small) | [Link](https://gist.github.com/cfreshman/a7b776506c73284511034e63af1017ee)* |

**modified by be to add missing words*
