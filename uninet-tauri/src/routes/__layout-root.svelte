<script>
  import Topnavbutton from "$lib/components/Topnavbutton.svelte";
  import Leftnavbar from "$lib/components/leftnavbar.svelte";
  import Chatchannel from "$lib/components/chatchannel/chatchannel.svelte";
    //import CustomeMenu from "$lib/components/customeMenu/CustomeMenu.svelte";
	import Navbar from "$lib/components/insta/header/Navbar.svelte";
	import Snackbar from "$lib/components/insta/Snackbar.svelte";


	import { snackbar, theme } from "$lib/store/ui";
	import { onMount } from "svelte";
	import { auth } from "$lib/store/auth";
  import { goto } from "$app/navigation";
  import { BASE_URL } from "$lib/config";
	import { navigating } from "$app/stores";
  import NavigationLoading from "$lib/components/insta/NavigationLoading.svelte";




	onMount(async () => {
    try {
      let axios = await import("axios");

      axios.defaults.baseURL = BASE_URL;
      axios.defaults.withCredentials = true;

      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        try {
          const res = await axios.get("/api/auth/me");

          if (res.data.type === "success") {
            auth.setUser({ user: res.data.data.user, token });
          }
          if (res.data.type === "error") {
            snackbar.showSnackbar({ ...res.data });
            goto("/login");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });


</script>

<!--<Topnavbutton></Topnavbutton>--> <!--BIG bug-->
<Leftnavbar></Leftnavbar>
<Chatchannel></Chatchannel> <!--CSS bug-->

<nav>
	<Navbar/>
</nav>
<Snackbar/>
<NavigationLoading active={$navigating} />


<!-- 
<CustomeMenu></CustomeMenu>
-->
<slot></slot>

