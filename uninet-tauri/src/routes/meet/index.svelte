<script>
  import Join from "$lib/components/meet/Join.svelte";

  import YourIdCard from "$lib/components/meet/YourIdCard.svelte";
  import { siteData } from "$lib/utils/config";

  import { Row, Col } from "svelte-materialify";
</script>

<svelte:head>
  <title>Home | {siteData.title}</title>
</svelte:head>
<Row>
  <Col cols={12} md={6}>
    <YourIdCard />
  </Col>

  <Col cols={12} md={6}>
    <Join />
  </Col>
</Row>
