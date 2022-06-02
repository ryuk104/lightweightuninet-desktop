<script context="module">
    export async function load({ params, fetch, url }) {
    const id = url.params
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const userprofile = await res.json()
  

  if (res.ok) {
    return {
      props: {
        userprofile
      }
    }
  }

  return {
    status: res.status,
    error: new Error('fetch failed')
  }
}
</script>

<script>
    export let userprofile
</script>

<div>
    <img src={userprofile.avatar} width="50" alt="d">
</div>